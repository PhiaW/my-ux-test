import { useState } from "react";
import { PICKABLE, COMMON, CATEGORY_LABELS, CATEGORY_ICONS } from "../data";

// 收合時預設顯示的食材數（約 2 排）；超過才出現「顯示更多」
const INITIAL_VISIBLE = 8;
// 全部可勾食材（搜尋用，跨分類）
const ALL_NAMES = Object.values(PICKABLE).flat();

// 食材勾選器：可收合面板 + 食材搜尋 + 分類 Accordion（可多類同時展開）+ 常用優先／顯示更多
export default function IngredientPicker({
  fridge,
  pickerOpen,
  openCats,
  moreCats,
  onTogglePickerOpen,
  onToggleCat,
  onToggleMore,
  onToggleIngredient,
  onClear,
}) {
  const [q, setQ] = useState(""); // 食材搜尋（找冰箱有的食材）
  const query = q.trim();
  const matches = query ? ALL_NAMES.filter((n) => n.includes(query)) : [];

  return (
    <div className={"picker" + (pickerOpen ? " is-open" : "")}>
      <button type="button" className="picker-head" aria-expanded={pickerOpen} onClick={onTogglePickerOpen}>
        <i className="fa-solid fa-basket-shopping" /> 我冰箱有
        <span className="count">{fridge.size} 樣</span>
        <i className="fa-solid fa-chevron-down chevron" />
      </button>

      {pickerOpen && (
        <div className="picker-body">
          <div className="plan-search">
            <i className="fa-solid fa-magnifying-glass" />
            <input
              type="text"
              aria-label="搜尋食材"
              placeholder="搜尋食材，找你冰箱有的…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
            {q && (
              <button type="button" className="plan-search-clear" aria-label="清除搜尋" onClick={() => setQ("")}>
                <i className="fa-solid fa-xmark" />
              </button>
            )}
          </div>

          {query ? (
            // 搜尋時：跨分類扁平結果
            matches.length === 0 ? (
              <p className="prep-note">找不到「{query}」相關食材</p>
            ) : (
              <div className="chip-row">
                {matches.map((name) => {
                  const on = fridge.has(name);
                  return (
                    <button
                      key={name}
                      type="button"
                      className={"chip" + (on ? " is-selected" : "")}
                      aria-pressed={on}
                      onClick={() => onToggleIngredient(name)}
                    >
                      <i className={"fa-solid " + (on ? "fa-circle-check" : "fa-plus")} /> {name}
                    </button>
                  );
                })}
              </div>
            )
          ) : (
            Object.entries(PICKABLE).map(([cat, names]) => {
            const selCount = names.filter((n) => fridge.has(n)).length;
            const isOpen = openCats.has(cat);
            // 常用優先排序：常用在前、其餘在後
            const ordered = [...names.filter((n) => COMMON.has(n)), ...names.filter((n) => !COMMON.has(n))];
            // 項目數 ≤ 門檻則全展開、不需「顯示更多」
            const expanded = moreCats.has(cat) || ordered.length <= INITIAL_VISIBLE;
            const tail = ordered.slice(INITIAL_VISIBLE);
            const hiddenCount = expanded ? 0 : tail.filter((n) => !fridge.has(n)).length;
            // 收合時：前 N 個 + 已選到的長尾（選過的不被藏）
            const visible = expanded
              ? ordered
              : ordered.filter((n, i) => i < INITIAL_VISIBLE || fridge.has(n));

            return (
              <div className="ingredient-group" key={cat}>
                <button
                  type="button"
                  className={"group-head" + (isOpen ? " is-open" : "")}
                  aria-expanded={isOpen}
                  onClick={() => onToggleCat(cat)}
                >
                  <i className={"fa-solid " + CATEGORY_ICONS[cat]} />
                  <span className="group-name">{CATEGORY_LABELS[cat]}</span>
                  {selCount > 0 && <span className="group-count">{selCount}</span>}
                  <i className="fa-solid fa-chevron-down chevron" />
                </button>

                {isOpen && (
                  <>
                    <div className="chip-row">
                      {visible.map((name) => {
                        const on = fridge.has(name);
                        return (
                          <button
                            key={name}
                            type="button"
                            className={"chip" + (on ? " is-selected" : "")}
                            aria-pressed={on}
                            onClick={() => onToggleIngredient(name)}
                          >
                            <i className={"fa-solid " + (on ? "fa-circle-check" : "fa-plus")} /> {name}
                          </button>
                        );
                      })}
                    </div>

                    {hiddenCount > 0 && (
                      <button type="button" className="more-btn" onClick={() => onToggleMore(cat)}>
                        顯示更多（{hiddenCount}）<i className="fa-solid fa-chevron-down" />
                      </button>
                    )}
                    {moreCats.has(cat) && ordered.length > INITIAL_VISIBLE && (
                      <button type="button" className="more-btn" onClick={() => onToggleMore(cat)}>
                        收合<i className="fa-solid fa-chevron-up" />
                      </button>
                    )}
                  </>
                )}
              </div>
            );
            })
          )}

          <button
            type="button"
            className="btn btn-secondary btn-block"
            onClick={onClear}
            disabled={fridge.size === 0}
          >
            <i className="fa-solid fa-rotate-left" /> 清空{fridge.size > 0 ? `（${fridge.size}）` : ""}
          </button>
        </div>
      )}
    </div>
  );
}
