// 雙模式切換：依菜單挑 / 依食材選
const MODES = [
  { key: "menu", label: "依菜單挑", icon: "fa-book-open" },
  { key: "fridge", label: "依食材選", icon: "fa-basket-shopping" },
];

export default function ModeSwitch({ mode, onChange }) {
  return (
    <div className="mode-switch" role="tablist" aria-label="瀏覽模式">
      {MODES.map((m) => (
        <button
          key={m.key}
          type="button"
          role="tab"
          aria-selected={mode === m.key}
          className={"mode-btn" + (mode === m.key ? " is-active" : "")}
          onClick={() => onChange(m.key)}
        >
          <i className={"fa-solid " + m.icon} /> {m.label}
        </button>
      ))}
    </div>
  );
}
