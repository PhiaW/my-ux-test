import { RECIPES } from "../data/recipes.js";
import { isReady, matchCount } from "../data/helpers.js";
import ModeSwitch from "./ModeSwitch.jsx";
import IngredientPicker from "./IngredientPicker.jsx";
import FilterTabs from "./FilterTabs.jsx";
import RecipeCard from "./RecipeCard.jsx";
import Pager from "./Pager.jsx";

const PAGE_SIZE = 6;

export default function HomePage({
  mode,
  route,
  page,
  fridge,
  pickerOpen,
  openCats,
  moreCats,
  onChangeMode,
  onChangeRoute,
  onChangePage,
  picker, // { onTogglePickerOpen, onToggleCat, onToggleMore, onToggleIngredient, onClear }
  onOpenRecipe,
}) {
  // 篩選 + 排序（依食材選且有勾：可做的排前面）
  let list = RECIPES.filter((r) => route === "all" || (r.scenarios || []).includes(route));
  if (mode === "fridge" && fridge.size > 0) {
    // 可做的優先，其次依「已備齊主食材數」由多到少（部分符合也會上浮）
    list = [...list].sort(
      (a, b) => isReady(b, fridge) - isReady(a, fridge) || matchCount(b, fridge) - matchCount(a, fridge)
    );
  }

  const totalPages = Math.max(1, Math.ceil(list.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageItems = list.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  return (
    <main className="view">
      <ModeSwitch mode={mode} onChange={onChangeMode} />

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
        <FilterTabs route={route} onChange={onChangeRoute} />

        {list.length === 0 ? (
          <div className="empty">
            <i className="fa-solid fa-utensils" />
            <h3>這個分類還沒有菜</h3>
            <p>換個情境標籤看看</p>
          </div>
        ) : (
          <div className="recipe-list">
            {pageItems.map((r) => (
              <RecipeCard key={r.id} recipe={r} mode={mode} fridge={fridge} onOpen={onOpenRecipe} />
            ))}
          </div>
        )}

        <Pager page={safePage} totalPages={totalPages} onChange={onChangePage} />
      </div>
    </main>
  );
}
