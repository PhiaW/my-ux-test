import { useEffect, useRef, useState } from "react";
import { SCENARIO_LABEL, RECIPES, TAG_VOCAB, METHOD_TAGS, activeValues } from "../data";

// 單一複選下拉：標題 + 計數/清除鈕 + 可收合選項面板
function MultiSelect({ label, opts, selected, onToggle, onClear }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // 點擊面板外部時關閉
  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  const count = selected.size;
  const summary = count === 0 ? "全部" : `已選 ${count}`;

  return (
    <div className="multiselect" ref={ref}>
      <div className="multiselect-label" id={`ms-${label}`}>
        {label}
      </div>
      <div className="multiselect-control">
        <button
          type="button"
          className={"multiselect-trigger" + (open ? " is-open" : "") + (count > 0 ? " has-clear" : "")}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-labelledby={`ms-${label}`}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="multiselect-summary">{summary}</span>
          <i className="fa-solid fa-chevron-down chevron" />
        </button>
        {/* 已選時：在原數量位置放清除鈕（不觸發展開） */}
        {count > 0 && (
          <button
            type="button"
            className="multiselect-clear"
            aria-label={`清除${label}篩選`}
            onClick={(e) => {
              e.stopPropagation();
              onClear();
            }}
          >
            <i className="fa-solid fa-circle-xmark" />
          </button>
        )}
      </div>

      {open && (
        <ul className="multiselect-panel" role="listbox" aria-multiselectable="true">
          {opts.map(([key, text]) => {
            const active = selected.has(key);
            return (
              <li key={key}>
                <button
                  type="button"
                  role="option"
                  aria-selected={active}
                  className={"multiselect-option" + (active ? " is-active" : "")}
                  onClick={() => onToggle(key)}
                >
                  <i className={"fa-solid " + (active ? "fa-square-check" : "fa-square")} />
                  <span>{text}</span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

// 篩選列：情境（時段）+ 方法（一鍋到底 / 電鍋），各自獨立複選下拉
export default function FilterDropdowns({ routes, methods, onChangeRoute, onChangeMethod, onClearRoutes, onClearMethods }) {
  const scenarioOpts = activeValues(RECIPES, (r) => r.scenarios, Object.keys(SCENARIO_LABEL)).map((s) => [
    s,
    SCENARIO_LABEL[s],
  ]);
  const methodOpts = activeValues(RECIPES, (r) => r.tags, METHOD_TAGS).map((t) => [t, TAG_VOCAB[t]]);

  return (
    <div className="filter-dropdowns">
      <MultiSelect label="情境" opts={scenarioOpts} selected={routes} onToggle={onChangeRoute} onClear={onClearRoutes} />
      <MultiSelect label="方法" opts={methodOpts} selected={methods} onToggle={onChangeMethod} onClear={onClearMethods} />
    </div>
  );
}
