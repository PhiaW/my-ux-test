import { useEffect, useRef, useState } from "react";
import { RECIPES, prepComponents, PREP_GUIDES } from "../data";

// localStorage：本週菜單與已備元件（跨開啟保留週計畫）
const PLAN_KEY = "rqc-prep-plan";
const DONE_KEY = "rqc-prep-done";
const loadSet = (k) => {
  try {
    return new Set(JSON.parse(localStorage.getItem(k) || "[]"));
  } catch {
    return new Set();
  }
};
const saveSet = (k, s) => {
  try {
    localStorage.setItem(k, JSON.stringify([...s]));
  } catch {
    /* localStorage 不可用時靜默略過 */
  }
};

// 備餐計畫：選本週要做的菜 → 合併出可一次備好的元件
// 未選菜時退回「全部常備元件」總覽（沿用反查邏輯）
export default function MealPrepView({ onOpenRecipe }) {
  const [planIds, setPlanIds] = useState(loadSet(PLAN_KEY));
  const [doneSet, setDoneSet] = useState(loadSet(DONE_KEY));
  const [pickOpen, setPickOpen] = useState(planIds.size === 0); // 無計畫預設展開選菜
  const [query, setQuery] = useState("");
  const [jumpOpen, setJumpOpen] = useState(true); // 快速跳轉面板
  const cardRefs = useRef({}); // name → 卡片 DOM
  const navRef = useRef(null); // 跳轉面板 DOM，判斷是否吸頂
  const suppressUntil = useRef(0); // 手動操作後免自動收合的時間戳

  useEffect(() => saveSet(PLAN_KEY, planIds), [planIds]);
  useEffect(() => saveSet(DONE_KEY, doneSet), [doneSet]);

  const toggleInSet = (set, key) => {
    const next = new Set(set);
    next.has(key) ? next.delete(key) : next.add(key);
    return next;
  };
  const togglePlan = (id) => setPlanIds((s) => toggleInSet(s, id));
  const toggleDone = (name) => setDoneSet((s) => toggleInSet(s, name));
  const clearPlan = () => setPlanIds(new Set());

  // 有計畫 → 只算選中的菜；無計畫 → 列全部元件（同一份反查邏輯自適應）
  const planRecipes = RECIPES.filter((r) => planIds.has(r.id));
  const hasPlan = planRecipes.length > 0;
  const components = hasPlan ? prepComponents(planRecipes) : prepComponents(RECIPES);
  const doneCount = components.filter((c) => doneSet.has(c.name)).length;
  const pct = components.length ? Math.round((doneCount / components.length) * 100) : 0;

  // 選菜清單：依搜尋過濾
  const q = query.trim();
  const pickList = RECIPES.filter((r) => !q || r.title.includes(q));

  // ── 快速跳轉面板（沿用）──
  const toggleJump = () => {
    suppressUntil.current = Date.now() + 500;
    setJumpOpen((v) => !v);
  };
  const jumpTo = (name) => {
    setJumpOpen(false);
    requestAnimationFrame(() => {
      cardRefs.current[name]?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const goingDown = y > lastY + 6;
      lastY = y;
      if (Date.now() < suppressUntil.current) return;
      if (goingDown && navRef.current && navRef.current.getBoundingClientRect().top <= 10) {
        setJumpOpen(false);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main className="view">
      <div className="prep-intro">
        <i className="fa-solid fa-box-open" />
        <p>選好本週要做的幾道菜，這裡會合併出「可一次備好的元件」與做法；勾掉備好的。沒選菜時，下方列出全部常備元件供瀏覽。</p>
      </div>

      {/* 選菜面板 */}
      <div className={"picker" + (pickOpen ? " is-open" : "")}>
        <button type="button" className="picker-head" aria-expanded={pickOpen} onClick={() => setPickOpen((v) => !v)}>
          <i className="fa-solid fa-calendar-week" /> 本週菜單
          <span className="count">{planIds.size} 道</span>
          <i className="fa-solid fa-chevron-down chevron" />
        </button>

        {pickOpen && (
          <div className="picker-body">
            <div className="plan-search">
              <i className="fa-solid fa-magnifying-glass" />
              <input
                type="text"
                aria-label="搜尋食譜加入本週菜單"
                placeholder="搜尋食譜名稱…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              {query && (
                <button type="button" className="plan-search-clear" aria-label="清除搜尋" onClick={() => setQuery("")}>
                  <i className="fa-solid fa-xmark" />
                </button>
              )}
            </div>

            <div className="plan-pick-list chip-row">
              {pickList.length === 0 ? (
                <p className="prep-note">找不到「{q}」相關食譜</p>
              ) : (
                pickList.map((r) => {
                  const on = planIds.has(r.id);
                  return (
                    <button
                      key={r.id}
                      type="button"
                      className={"chip" + (on ? " is-selected" : "")}
                      aria-pressed={on}
                      onClick={() => togglePlan(r.id)}
                    >
                      <i className={"fa-solid " + (on ? "fa-circle-check" : "fa-plus")} /> {r.title}
                    </button>
                  );
                })
              )}
            </div>

            <button type="button" className="btn btn-ghost btn-block" onClick={clearPlan} disabled={planIds.size === 0}>
              <i className="fa-solid fa-rotate-left" /> 清空本週菜單{planIds.size > 0 ? `（${planIds.size}）` : ""}
            </button>
          </div>
        )}
      </div>

      {/* 計畫摘要 + 進度 */}
      {hasPlan && (
        <div className="plan-status">
          <div className="plan-summary">
            <span className="plan-stat"><strong>{planRecipes.length}</strong> 道菜</span>
            <span className="plan-dot" aria-hidden="true">·</span>
            <span className="plan-stat"><strong>{components.length}</strong> 個元件要備</span>
            <span className="plan-dot" aria-hidden="true">·</span>
            <span className="plan-stat"><strong>{doneCount}/{components.length}</strong> 已備</span>
          </div>
          <div className="plan-progress" role="progressbar" aria-valuemin={0} aria-valuemax={components.length} aria-valuenow={doneCount}>
            <span className="plan-progress-fill" style={{ width: pct + "%" }} />
          </div>
        </div>
      )}

      {/* 快速跳轉（元件多時才出現） */}
      {components.length > 4 && (
        <div ref={navRef} className={"picker jump-nav" + (jumpOpen ? " is-open" : "")}>
          <button type="button" className="picker-head" aria-expanded={jumpOpen} onClick={toggleJump}>
            <i className="fa-solid fa-bookmark" /> {hasPlan ? "本週備料" : "備料元件"}
            <span className="count">{components.length} 個</span>
            <i className="fa-solid fa-chevron-down chevron" />
          </button>
          {jumpOpen && (
            <div className="picker-body">
              <div className="chip-row">
                {components.map((c) => (
                  <button key={c.name} type="button" className="chip jump-chip" onClick={() => jumpTo(c.name)}>
                    {c.name}
                    <span className="group-count">{c.recipes.length}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {components.length === 0 ? (
        <div className="empty">
          <i className="fa-solid fa-utensils" />
          <h3>還沒選菜</h3>
          <p>在上方「本週菜單」挑幾道菜，這裡會合併出可一次備好的元件</p>
        </div>
      ) : (
        <div className="prep-list">
          {components.map((c) => {
            const guide = PREP_GUIDES[c.name];
            const done = hasPlan && doneSet.has(c.name);
            return (
              <section
                key={c.name}
                className={"prep-card" + (done ? " is-done" : "")}
                ref={(el) => {
                  cardRefs.current[c.name] = el;
                }}
              >
                <div className="prep-card-head">
                  {hasPlan && (
                    <label className="prep-check">
                      <input type="checkbox" checked={done} onChange={() => toggleDone(c.name)} />
                      <span className="prep-check-box" aria-hidden="true">
                        <i className="fa-solid fa-check" />
                      </span>
                      <span className="sr-only">標記「{c.name}」已備好</span>
                    </label>
                  )}
                  <span className="prep-name">{c.name}</span>
                  <span className="badge badge-method">{hasPlan ? "本週 " : ""}{c.recipes.length} 道菜用到</span>
                </div>

                {guide ? (
                  <>
                    <div className="prep-meta">
                      {guide.yield && (
                        <span className="prep-meta-item">
                          <i className="fa-solid fa-scale-balanced" /> {guide.yield}
                        </span>
                      )}
                      {guide.storage && (
                        <span className="prep-meta-item">
                          <i className="fa-solid fa-snowflake" /> {guide.storage}
                        </span>
                      )}
                    </div>
                    <ol className="prep-steps">
                      {guide.steps.map((s, i) => (
                        <li key={i}>
                          {Array.isArray(s)
                            ? s.map((line, j) => (
                                <span key={j} className="step-line">
                                  {line}
                                </span>
                              ))
                            : s}
                        </li>
                      ))}
                    </ol>
                    {guide.note && <p className="prep-note">{guide.note}</p>}
                  </>
                ) : (
                  <p className="prep-note">做法待補</p>
                )}

                <div className="prep-uses-block">
                  <div className="prep-uses-label">{hasPlan ? "本週用在" : "用在這些菜"}</div>
                  <div className="prep-uses">
                    {c.recipes.map((r) => (
                      <button key={r.id} type="button" className="prep-use-chip" onClick={() => onOpenRecipe(r)}>
                        <i className="fa-solid fa-utensils" /> {r.title}
                      </button>
                    ))}
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      )}
    </main>
  );
}
