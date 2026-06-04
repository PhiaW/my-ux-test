import { SCENARIO_LABEL, RECIPES } from "../data/recipes.js";
import { activeValues } from "../data/helpers.js";

// 情境篩選 tabs（scenario）
export default function FilterTabs({ route, onChange }) {
  const opts = [
    ["all", "全部"],
    ...activeValues(RECIPES, (r) => r.scenarios, Object.keys(SCENARIO_LABEL)).map((s) => [s, SCENARIO_LABEL[s]]),
  ];

  return (
    <div className="filters">
      <div className="filter-group">
        <div className="filter-group-label">情境</div>
        <div className="filter-row">
          {opts.map(([key, text]) => (
            <button
              key={key}
              type="button"
              className={"filter-tab" + (route === key ? " is-active" : "")}
              aria-pressed={route === key}
              onClick={() => onChange(key)}
            >
              {text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
