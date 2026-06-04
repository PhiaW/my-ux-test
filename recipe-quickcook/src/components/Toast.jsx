// 全域提示訊息（顯示後自動淡出由 App 控制 message 清空）
export default function Toast({ message }) {
  return (
    <div className={"toast" + (message ? " show" : "")} role="status" aria-live="polite">
      {message ? (
        <>
          <i className="fa-solid fa-check" />
          {message}
        </>
      ) : null}
    </div>
  );
}
