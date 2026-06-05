import { useEffect, useState } from "react";

// 全域回頂鍵：右下角圓形半透明，捲動超過一定距離才出現
export default function ScrollTopButton() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 300);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <button
      type="button"
      className={"scroll-top" + (show ? " is-visible" : "")}
      aria-label="回到頂部"
      aria-hidden={!show}
      tabIndex={show ? 0 : -1}
      onClick={toTop}
    >
      <i className="fa-solid fa-chevron-up" />
    </button>
  );
}
