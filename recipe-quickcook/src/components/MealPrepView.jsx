import { useEffect, useRef, useState } from "react";
import { RECIPES } from "../data/recipes.js";
import { prepComponents } from "../data/helpers.js";
import { PREP_GUIDES } from "../../data/prep-guides.js";

// 備餐計畫：以「備料元件」為主軸，反查每個元件被哪些食譜使用
// （本輪先做對照；元件做法/份量/保存為下一輪資料）
export default function MealPrepView({ onOpenRecipe }) {
  const components = prepComponents(RECIPES);
  const [jumpOpen, setJumpOpen] = useState(true); // 快速跳轉面板（預設展開，方便找）
  const cardRefs = useRef({}); // name → 卡片 DOM，供平滑捲動
  const navRef = useRef(null); // 跳轉面板 DOM，用於判斷是否已吸頂

  const jumpTo = (name) => {
    setJumpOpen(false); // 吸頂時收合面板，跳轉後只留一條細 bar，不擋住目標卡片
    requestAnimationFrame(() => {
      cardRefs.current[name]?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  // 往下捲且面板已吸頂時自動收合（避免展開狀態蓋住下方內容）；向上捲/靜止不干擾，仍可手動展開
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const goingDown = y > lastY + 2;
      lastY = y;
      // 面板頂端貼到吸頂位置（top:8px）即視為已 pinned
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
        <p>一次備好這些元件，整週多道菜直接取用。點食譜可看哪些菜會用到它。</p>
      </div>

      {/* 快速跳轉：以「依食材」面板的形式，點元件名捲動到對應卡片 */}
      {components.length > 0 && (
        <div ref={navRef} className={"picker jump-nav" + (jumpOpen ? " is-open" : "")}>
          <button
            type="button"
            className="picker-head"
            aria-expanded={jumpOpen}
            onClick={() => setJumpOpen((v) => !v)}
          >
            <i className="fa-solid fa-bookmark" /> 備料元件
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
          <i className="fa-solid fa-box-open" />
          <h3>還沒有備料元件</h3>
          <p>在食譜的 prepGuideRef 標記常備元件後會出現在這裡</p>
        </div>
      ) : (
        <div className="prep-list">
          {components.map((c) => {
            const guide = PREP_GUIDES[c.name];
            return (
              <section
                key={c.name}
                className="prep-card"
                ref={(el) => {
                  cardRefs.current[c.name] = el;
                }}
              >
                <div className="prep-card-head">
                  <span className="prep-name">{c.name}</span>
                  <span className="badge badge-method">{c.recipes.length} 道菜用到</span>
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
                        // 步驟值可為字串，或字串陣列（同一編號內多行顯示）
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
                  <div className="prep-uses-label">用在這些菜</div>
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
