// 分頁器：上一頁 / 頁碼 / 下一頁
export default function Pager({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null;

  const go = (p) => {
    onChange(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="pager">
      <button type="button" className="page-btn" disabled={page === 1} aria-label="上一頁" onClick={() => go(page - 1)}>
        <i className="fa-solid fa-chevron-left" />
      </button>
      {pages.map((p) => (
        <button
          key={p}
          type="button"
          className={"page-btn" + (p === page ? " is-active" : "")}
          aria-current={p === page ? "page" : undefined}
          onClick={() => go(p)}
        >
          {p}
        </button>
      ))}
      <button type="button" className="page-btn" disabled={page === totalPages} aria-label="下一頁" onClick={() => go(page + 1)}>
        <i className="fa-solid fa-chevron-right" />
      </button>
    </div>
  );
}
