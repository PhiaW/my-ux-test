import { useEffect, useRef, useState } from "react";
import HomePage from "./components/HomePage.jsx";
import MealPrepView from "./components/MealPrepView.jsx";
import ModeSwitch from "./components/ModeSwitch.jsx";
import RecipeDetail from "./components/RecipeDetail.jsx";
import ScrollTopButton from "./components/ScrollTopButton.jsx";
import Toast from "./components/Toast.jsx";
import headerDish from "./assets/header-dish.svg";

// 不可變 Set 切換工具
const toggleInSet = (set, key) => {
  const next = new Set(set);
  next.has(key) ? next.delete(key) : next.add(key);
  return next;
};

// localStorage Set 讀寫（冰箱食材持久化用）
const FRIDGE_KEY = "rqc-fridge";
const loadSet = (k) => {
  try {
    return new Set(JSON.parse(localStorage.getItem(k) || "[]"));
  } catch {
    return new Set();
  }
};

export default function App() {
  const [mode, setMode] = useState("menu");
  const [routes, setRoutes] = useState(() => new Set()); // 情境複選（空＝全部）
  const [methods, setMethods] = useState(() => new Set()); // 方法複選（空＝全部）
  const [page, setPage] = useState(1);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [openCats, setOpenCats] = useState(() => new Set());
  const [moreCats, setMoreCats] = useState(() => new Set());
  const [fridge, setFridge] = useState(() => loadSet(FRIDGE_KEY));
  const [query, setQuery] = useState(""); // 首頁食譜搜尋
  const [selected, setSelected] = useState(null);
  const [toastMsg, setToastMsg] = useState("");
  const toastTimer = useRef(null);

  // 冰箱食材持久化（與備餐計畫的 plan/done 一致）
  useEffect(() => {
    try {
      localStorage.setItem(FRIDGE_KEY, JSON.stringify([...fridge]));
    } catch {
      /* localStorage 不可用時靜默略過 */
    }
  }, [fridge]);

  const changeQuery = (q) => {
    setQuery(q);
    setPage(1); // 搜尋變動回第 1 頁，才看得到結果
  };

  const clearFridge = () => setFridge(new Set()); // 清除「我冰箱有」（詳情頁／備餐頁誤選時用）

  const showToast = (msg) => {
    setToastMsg(msg);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastMsg(""), 1800);
  };

  const changeMode = (m) => {
    setMode(m);
    setPage(1);
    window.scrollTo(0, 0); // 切換模式回頁首，讓使用者看出已換頁
  };
  const changeRoute = (r) => {
    setRoutes((s) => toggleInSet(s, r));
    setPage(1);
  };
  const changeMethod = (m) => {
    setMethods((s) => toggleInSet(s, m));
    setPage(1);
  };
  const clearRoutes = () => {
    setRoutes(new Set());
    setPage(1);
  };
  const clearMethods = () => {
    setMethods(new Set());
    setPage(1);
  };

  const picker = {
    onTogglePickerOpen: () => setPickerOpen((v) => !v),
    onToggleCat: (cat) => setOpenCats((s) => toggleInSet(s, cat)),
    onToggleMore: (cat) => setMoreCats((s) => toggleInSet(s, cat)),
    onToggleIngredient: (name) => {
      setFridge((s) => toggleInSet(s, name));
      setPage(1); // 重新排序後回到第 1 頁，才看得到上浮的食譜
    },
    onClear: () => {
      setFridge(new Set());
      setPage(1);
    },
  };

  const openRecipe = (r) => {
    setSelected(r);
    window.scrollTo(0, 0);
  };
  const closeDetail = () => {
    setSelected(null);
    window.scrollTo(0, 0);
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="app-header-text">
          <h1>Recipe QuickCook</h1>
          <p>快速冰箱食譜</p>
        </div>
        <img className="header-dish" src={headerDish} alt="" aria-hidden="true" />
      </header>

      {selected ? (
        <RecipeDetail
          key={selected.id}
          recipe={selected}
          mode={mode}
          fridge={fridge}
          onBack={closeDetail}
          onToast={showToast}
          onClearFridge={clearFridge}
        />
      ) : mode === "prep" ? (
        <MealPrepView fridge={fridge} onClearFridge={clearFridge} onOpenRecipe={openRecipe} />
      ) : (
        <HomePage
          mode={mode}
          routes={routes}
          methods={methods}
          page={page}
          fridge={fridge}
          query={query}
          onChangeQuery={changeQuery}
          pickerOpen={pickerOpen}
          openCats={openCats}
          moreCats={moreCats}
          onChangeRoute={changeRoute}
          onChangeMethod={changeMethod}
          onClearRoutes={clearRoutes}
          onClearMethods={clearMethods}
          onChangePage={setPage}
          picker={picker}
          onOpenRecipe={openRecipe}
        />
      )}

      {/* 詳情頁時隱藏底部導覽，避免干擾閱讀 */}
      {!selected && <ModeSwitch mode={mode} onChange={changeMode} />}

      <Toast message={toastMsg} />
      <ScrollTopButton />
    </div>
  );
}
