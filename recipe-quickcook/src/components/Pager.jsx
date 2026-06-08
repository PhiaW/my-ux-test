// 分頁器：上一頁 / 頁碼（頭尾固定，中段省略）/ 下一頁
export default function Pager({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null;

  // 換頁保持原捲動位置（使用者自行上滑，避免跳動造成混亂）
  const go = (p) => onChange(p);

  // 固定寬度（7 槽不跳動）：頭段「1 2 3 4 5 … 14」、尾段「1 … 10 11 12 13 14」、
  // 中段「1 … 6 7 8 … 14」；相鄰頁皆可點
  const pages = (() => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (page <= 4) return [1, 2, 3, 4, 5, "…", totalPages];
    if (page >= totalPages - 3)
      return [1, "…", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    return [1, "…", page - 1, page, page + 1, "…", totalPages];
  })();

  return (
    <div className="pager">
      <button type="button" className="page-btn" disabled={page === 1} aria-label="上一頁" onClick={() => go(page - 1)}>
        <i className="fa-solid fa-chevron-left" />
      </button>
      {pages.map((p, i) =>
        p === "…" ? (
          <span key={`gap-${i}`} className="page-ellipsis" aria-hidden="true">
            …
          </span>
        ) : (
          <button
            key={p}
            type="button"
            className={"page-btn" + (p === page ? " is-active" : "")}
            aria-current={p === page ? "page" : undefined}
            onClick={() => go(p)}
          >
            {p}
          </button>
        )
      )}
      <button type="button" className="page-btn" disabled={page === totalPages} aria-label="下一頁" onClick={() => go(page + 1)}>
        <i className="fa-solid fa-chevron-right" />
      </button>
      <span className="pager-total">共 {totalPages} 頁</span>
    </div>
  );
}
