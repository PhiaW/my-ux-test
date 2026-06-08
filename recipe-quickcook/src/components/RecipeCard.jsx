import { coreStatus, isReady, TAG_VOCAB, METHOD_TAGS } from "../data";
import RecipeCover from "./RecipeCover.jsx";

// 食譜卡：封面 + 標題列（份數右上角）+ 核心食材 chip 或有/缺對照燈
export default function RecipeCard({ recipe, mode, fridge, onOpen }) {
  const showMatch = mode === "fridge" && fridge.size > 0;
  const ready = showMatch && isReady(recipe, fridge);
  const methods = METHOD_TAGS.filter((t) => (recipe.tags || []).includes(t));

  return (
    <button type="button" className={"recipe-card" + (ready ? " is-ready" : "")} onClick={() => onOpen(recipe)}>
      <RecipeCover recipe={recipe} className="card-cover" />
      <div className="card-body">
        <div className="card-titlebar">
          <span className="card-title">{recipe.title}</span>
          {ready && (
            <span className="ready-flag">
              <i className="fa-solid fa-circle-check" /> 可做
            </span>
          )}
          <span className="badge badge-info card-servings">{recipe.servings}</span>
        </div>

        {methods.length > 0 && (
          <div className="card-methods">
            {methods.map((t) => (
              <span key={t} className="badge badge-method">
                <i className="fa-solid fa-utensils" /> {TAG_VOCAB[t]}
              </span>
            ))}
          </div>
        )}

        {showMatch ? (
          <div className="match-row">
            {coreStatus(recipe, fridge).map((d) => {
              const cls = d.state === "HAVE" ? "on" : d.state === "SUBBED" ? "sub" : d.state === "OPTIONAL" ? "on" : "";
              const label = d.state === "SUBBED" ? d.via : d.name;
              return (
                <span key={d.name} className={"match-chip " + cls}>
                  <span className="dot" />
                  {label}
                </span>
              );
            })}
          </div>
        ) : (
          <div className="ing-row-chips">
            {recipe.core.map((c) => (
              <span key={c} className="badge badge-ing">
                {c}
              </span>
            ))}
          </div>
        )}
      </div>
    </button>
  );
}
