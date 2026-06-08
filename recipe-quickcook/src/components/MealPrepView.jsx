import { useEffect, useState } from "react";
import { RECIPES, prepComponents, PREP_GUIDES, normalize, categoryOf, CATEGORY_LABELS } from "../data";

// localStorage：本週菜單／已備元件／採買勾選覆寫（跨開啟保留週計畫）
const PLAN_KEY = "rqc-prep-plan";
const DONE_KEY = "rqc-prep-done";
// 採買「要買」預設＝不在冰箱的食材；以下兩組記錄使用者手動覆寫：
const SKIP_KEY = "rqc-prep-skipbuy"; // 不在冰箱但取消勾（不買）
const EXTRA_KEY = "rqc-prep-extrabuy"; // 冰箱已有但仍想買（加勾）

// 採買清單分類顯示順序
const CAT_ORDER = ["protein", "vegetable", "grain", "dairy", "other", "seasoning"];
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

// 備餐計畫：選本週要做的菜 → 合併出採買清單與可一次備好的元件
export default function MealPrepView({ fridge = new Set(), onClearFridge, onOpenRecipe }) {
  const [planIds, setPlanIds] = useState(loadSet(PLAN_KEY));
  const [doneSet, setDoneSet] = useState(loadSet(DONE_KEY));
  const [skipBuy, setSkipBuy] = useState(loadSet(SKIP_KEY));
  const [extraBuy, setExtraBuy] = useState(loadSet(EXTRA_KEY));
  const [pickOpen, setPickOpen] = useState(planIds.size === 0); // 無計畫預設展開選菜
  const [shopOpen, setShopOpen] = useState(true); // 採買清單面板
  const [prepOpen, setPrepOpen] = useState(true); // 備料元件面板
  const [copied, setCopied] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => saveSet(PLAN_KEY, planIds), [planIds]);
  useEffect(() => saveSet(DONE_KEY, doneSet), [doneSet]);
  useEffect(() => saveSet(SKIP_KEY, skipBuy), [skipBuy]);
  useEffect(() => saveSet(EXTRA_KEY, extraBuy), [extraBuy]);

  const toggleInSet = (set, key) => {
    const next = new Set(set);
    next.has(key) ? next.delete(key) : next.add(key);
    return next;
  };
  const togglePlan = (id) => setPlanIds((s) => toggleInSet(s, id));
  const toggleDone = (name) => setDoneSet((s) => toggleInSet(s, name));
  const clearPlan = () => setPlanIds(new Set());

  // 採買勾選：要買＝勾（橘）。預設不在冰箱的勾起；冰箱有的不勾但可勾（仍想買）
  const isBuying = (name) => (fridge.has(name) ? extraBuy.has(name) : !skipBuy.has(name));
  const toggleBuy = (name) => {
    if (fridge.has(name)) setExtraBuy((s) => toggleInSet(s, name));
    else setSkipBuy((s) => toggleInSet(s, name));
  };

  // 有計畫 → 只算選中的菜；無計畫 → 列全部元件（同一份反查邏輯自適應）
  const planRecipes = RECIPES.filter((r) => planIds.has(r.id));
  const hasPlan = planRecipes.length > 0;
  const components = hasPlan ? prepComponents(planRecipes) : prepComponents(RECIPES);
  const doneCount = components.filter((c) => doneSet.has(c.name)).length;
  const pct = components.length ? Math.round((doneCount / components.length) * 100) : 0;

  // ── 合併採買清單：彙整計畫內所有菜的核心食材（正規化去重、依分類分組） ──
  const buyMap = new Map(); // 標準名 → 使用的菜數
  planRecipes.forEach((r) => {
    new Set((r.core || []).map(normalize)).forEach((n) => buyMap.set(n, (buyMap.get(n) || 0) + 1));
  });
  const shopGroups = CAT_ORDER.map((cat) => ({
    cat,
    label: CATEGORY_LABELS[cat] || cat,
    items: [...buyMap.entries()]
      .filter(([n]) => categoryOf(n) === cat)
      .map(([name, count]) => ({ name, count, inFridge: fridge.has(name) }))
      // 冰箱已有的沉到後面；同層依使用菜數多到少
      .sort((a, b) => a.inFridge - b.inFridge || b.count - a.count),
  })).filter((g) => g.items.length);
  // 要買的＝目前勾起的食材
  const buyList = [...buyMap.keys()].filter(isBuying);

  // 清空採買勾選：全部取消勾（不在冰箱的設為 skip、冰箱有的清掉 extra）
  const clearBuy = () => {
    setSkipBuy(new Set([...buyMap.keys()].filter((n) => !fridge.has(n))));
    setExtraBuy(new Set());
  };

  const copyShopping = () => {
    const text = shopGroups
      .map((g) => {
        const lines = g.items.filter((it) => isBuying(it.name)).map((it) => `  - ${it.name}`);
        return lines.length ? `【${g.label}】\n${lines.join("\n")}` : "";
      })
      .filter(Boolean)
      .join("\n");
    if (!text) return;
    navigator.clipboard?.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };

  // 選菜清單：依搜尋過濾
  const q = query.trim();
  const pickList = RECIPES.filter((r) => !q || r.title.includes(q));

  return (
    <main className="view">
      <div className="prep-intro">
        <i className="fa-solid fa-box-open" />
        <p>選好本週要做的幾道菜，下面會合併出「採買清單」與「可一次備好的元件」。</p>
      </div>

      {/* 本週菜單（輸入） */}
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

            <button type="button" className="btn btn-secondary btn-block" onClick={clearPlan} disabled={planIds.size === 0}>
              <i className="fa-solid fa-rotate-left" /> 清空本週菜單{planIds.size > 0 ? `（${planIds.size}）` : ""}
            </button>
          </div>
        )}
      </div>

      {!hasPlan ? (
        <div className="empty">
          <i className="fa-solid fa-utensils" />
          <h3>還沒選菜</h3>
          <p>在上方「本週菜單」挑幾道菜，這裡會合併出採買清單與備料元件</p>
        </div>
      ) : (
        <>
          {/* 摘要 + 進度 */}
          <div className="plan-status">
            <div className="plan-summary">
              <span className="plan-stat"><strong>{planRecipes.length}</strong> 道菜</span>
              <span className="plan-dot" aria-hidden="true">·</span>
              <span className="plan-stat">要買 <strong>{buyList.length}</strong> 樣</span>
              <span className="plan-dot" aria-hidden="true">·</span>
              <span className="plan-stat">備料 <strong>{doneCount}/{components.length}</strong></span>
            </div>
            <div className="plan-progress" role="progressbar" aria-valuemin={0} aria-valuemax={components.length} aria-valuenow={doneCount}>
              <span className="plan-progress-fill" style={{ width: pct + "%" }} />
            </div>
          </div>

          {/* 採買清單（可收合）：要買＝橘勾；冰箱有＝標「已有」可改勾 */}
          <div className={"picker" + (shopOpen ? " is-open" : "")}>
            <button type="button" className="picker-head" aria-expanded={shopOpen} onClick={() => setShopOpen((v) => !v)}>
              <i className="fa-solid fa-cart-shopping" /> 採買清單
              <span className="count">要買 {buyList.length} 樣</span>
              <i className="fa-solid fa-chevron-down chevron" />
            </button>

            {shopOpen && (
              <div className="picker-body">
                {shopGroups.map((g) => (
                  <div className="shop-group" key={g.cat}>
                    <div className="shop-group-label">{g.label}</div>
                    <div className="shop-items">
                      {g.items.map((it) => {
                        const buying = isBuying(it.name);
                        return (
                          <div key={it.name} className={"ing-row" + (it.inFridge ? " have" : "")}>
                            <div className="ing-main">
                              <button
                                type="button"
                                className={"ing-check" + (buying ? " checked" : "")}
                                aria-pressed={buying}
                                aria-label={(buying ? "取消採買 " : "加入採買 ") + it.name}
                                onClick={() => toggleBuy(it.name)}
                              >
                                <i className="fa-solid fa-check" />
                              </button>
                              <div className="name-block">
                                <span className="name">{it.name}</span>
                              </div>
                              {it.count > 1 && <span className="qty">{it.count} 道</span>}
                              <span className={"tag-mini" + (it.inFridge ? "" : " tag-mini--buy")}>
                                {it.inFridge ? "已有" : "要買"}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}

                <div className="copy-bar">
                  <button type="button" className="btn btn-secondary btn-clear" onClick={clearBuy} disabled={buyList.length === 0}>
                    <i className="fa-solid fa-eraser" /> 清空
                  </button>
                  <button type="button" className="btn btn-primary btn-copy" onClick={copyShopping} disabled={buyList.length === 0}>
                    <i className={"fa-solid " + (copied ? "fa-check" : "fa-copy")} /> {copied ? "已複製" : `複製要買的（${buyList.length}）`}
                  </button>
                </div>

                {fridge.size > 0 && (
                  <button type="button" className="btn btn-ghost btn-block" onClick={onClearFridge}>
                    <i className="fa-solid fa-basket-shopping" /> 清除冰箱已有
                  </button>
                )}
              </div>
            )}
          </div>

          {/* 備料元件（可收合） */}
          <div className={"picker" + (prepOpen ? " is-open" : "")}>
            <button type="button" className="picker-head" aria-expanded={prepOpen} onClick={() => setPrepOpen((v) => !v)}>
              <i className="fa-solid fa-box-open" /> 備料元件
              <span className="count">{components.length} 個</span>
              <i className="fa-solid fa-chevron-down chevron" />
            </button>

            {prepOpen && (
              <div className="picker-body">
                {components.length === 0 ? (
                  <p className="prep-note">本週這幾道菜不需特別備料，直接開煮即可。</p>
                ) : (
                  <div className="prep-list">
                    {components.map((c) => {
                      const guide = PREP_GUIDES[c.name];
                      const done = doneSet.has(c.name);
                      return (
                        <section key={c.name} className={"prep-card" + (done ? " is-done" : "")}>
                          <div className="prep-card-head">
                            <label className="prep-check">
                              <input type="checkbox" checked={done} onChange={() => toggleDone(c.name)} />
                              <span className="prep-check-box" aria-hidden="true">
                                <i className="fa-solid fa-check" />
                              </span>
                              <span className="sr-only">標記「{c.name}」已備好</span>
                            </label>
                            <span className="prep-name">{c.name}</span>
                            <span className="badge badge-method">本週 {c.recipes.length} 道菜用到</span>
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
                            <div className="prep-uses-label">本週用在</div>
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
              </div>
            )}
          </div>
        </>
      )}
    </main>
  );
}
