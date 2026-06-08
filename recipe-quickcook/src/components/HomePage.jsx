import { useMemo, useState } from "react";
import { RECIPES, SCENARIO_LABEL, TAG_VOCAB, isReady, matchCount, shuffleSeeded } from "../data";
import IngredientPicker from "./IngredientPicker.jsx";
import FilterDropdowns from "./FilterDropdowns.jsx";
import RecipeCard from "./RecipeCard.jsx";
import Pager from "./Pager.jsx";

const PAGE_SIZE = 6;

export default function HomePage({
  mode,
  routes, // Set：情境複選（空＝全部）
  methods, // Set：方法複選（空＝全部）
  page,
  fridge,
  pickerOpen,
  openCats,
  moreCats,
  onChangeRoute,
  onChangeMethod,
  onClearRoutes,
  onClearMethods,
  onChangePage,
  picker, // { onTogglePickerOpen, onToggleCat, onToggleMore, onToggleIngredient, onClear }
  onOpenRecipe,
}) {
  // 「依食材選且有勾」時用可做優先排序；其餘（菜單瀏覽）用種子洗牌，讓新食譜也有機會露出
  const fridgeSorted = mode === "fridge" && fridge.size > 0;
  // 洗牌種子存 localStorage：重新進站維持上次順序，按「隨機排序」才重洗
  const [seed, setSeed] = useState(() => {
    const saved = Number(localStorage.getItem("rqc_seed"));
    if (saved) return saved;
    const s = Math.floor(Math.random() * 1e6);
    localStorage.setItem("rqc_seed", String(s));
    return s;
  });

  // 篩選（情境 × 方法，複選 OR；空集合＝不篩選）+ 排序
  const list = useMemo(() => {
    const filtered = RECIPES.filter(
      (r) =>
        (routes.size === 0 || (r.scenarios || []).some((s) => routes.has(s))) &&
        (methods.size === 0 || (r.tags || []).some((t) => methods.has(t)))
    );
    if (fridgeSorted) {
      // 可做的優先，其次依「已備齊主食材數」由多到少（部分符合也會上浮）
      return [...filtered].sort(
        (a, b) => isReady(b, fridge) - isReady(a, fridge) || matchCount(b, fridge) - matchCount(a, fridge)
      );
    }
    return shuffleSeeded(filtered, seed);
  }, [routes, methods, fridgeSorted, fridge, seed]);

  const reshuffle = () => {
    const s = Math.floor(Math.random() * 1e6);
    localStorage.setItem("rqc_seed", String(s));
    setSeed(s);
    onChangePage(1);
  };

  // 篩選提示：情境 + 方法串成前綴，如「快速早餐 · 電鍋 · 共 5 道」
  const routeLabels = [...routes].map((r) => SCENARIO_LABEL[r]).filter(Boolean);
  const methodLabels = [...methods].map((m) => TAG_VOCAB[m]).filter(Boolean);
  const groups = [];
  if (routeLabels.length) groups.push(routeLabels.join("、"));
  if (methodLabels.length) groups.push(methodLabels.join("、"));
  const countPrefix = groups.length ? groups.join(" · ") + " · " : "";

  const totalPages = Math.max(1, Math.ceil(list.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageItems = list.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  return (
    <main className="view">
      {mode === "fridge" && (
        <IngredientPicker
          fridge={fridge}
          pickerOpen={pickerOpen}
          openCats={openCats}
          moreCats={moreCats}
          {...picker}
        />
      )}

      <div className="block">
        <FilterDropdowns
          routes={routes}
          methods={methods}
          onChangeRoute={onChangeRoute}
          onChangeMethod={onChangeMethod}
          onClearRoutes={onClearRoutes}
          onClearMethods={onClearMethods}
        />

        {list.length === 0 ? (
          <div className="empty">
            <i className="fa-solid fa-utensils" />
            <h3>這個分類還沒有菜</h3>
            <p>換個情境標籤看看</p>
          </div>
        ) : (
          <>
            <div className="list-toolbar">
              <span className="list-count">{countPrefix}共 {list.length} 道</span>
              {!fridgeSorted && (
                <button type="button" className="btn-shuffle" onClick={reshuffle}>
                  <i className="fa-solid fa-shuffle" />
                  隨機排序
                </button>
              )}
            </div>
            <div className="recipe-list">
              {pageItems.map((r) => (
                <RecipeCard key={r.id} recipe={r} mode={mode} fridge={fridge} onOpen={onOpenRecipe} />
              ))}
            </div>
          </>
        )}

        <Pager page={safePage} totalPages={totalPages} onChange={onChangePage} />
      </div>
    </main>
  );
}
