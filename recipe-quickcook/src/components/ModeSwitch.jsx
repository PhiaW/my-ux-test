// 底部導覽：依菜單挑 / 依食材選 / 備餐計畫（sticky bottom nav）
const MODES = [
  { key: "menu", label: "依菜單挑", icon: "fa-book-open" },
  { key: "fridge", label: "依食材選", icon: "fa-basket-shopping" },
  { key: "prep", label: "備餐計畫", icon: "fa-box-open" },
];

export default function ModeSwitch({ mode, onChange }) {
  return (
    <nav className="bottom-nav" role="tablist" aria-label="瀏覽模式">
      {MODES.map((m) => (
        <button
          key={m.key}
          type="button"
          role="tab"
          aria-selected={mode === m.key}
          className={"bottom-nav-btn" + (mode === m.key ? " is-active" : "")}
          onClick={() => onChange(m.key)}
        >
          <i className={"fa-solid " + m.icon} />
          <span className="bottom-nav-label">{m.label}</span>
        </button>
      ))}
    </nav>
  );
}
