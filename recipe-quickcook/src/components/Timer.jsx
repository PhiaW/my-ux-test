import { useEffect, useRef, useState } from "react";
import { fmt } from "../data";

// 步驟計時器：play / pause / reset，倒數結束標記 is-done
export default function Timer({ seconds }) {
  const [remain, setRemain] = useState(seconds);
  const [ticking, setTicking] = useState(false);
  const [done, setDone] = useState(false);
  const handleRef = useRef(null);

  const clear = () => {
    if (handleRef.current) {
      clearInterval(handleRef.current);
      handleRef.current = null;
    }
  };

  // 卸載時清除計時，避免 memory leak
  useEffect(() => clear, []);

  const toggle = () => {
    if (ticking) {
      clear();
      setTicking(false);
      return;
    }
    // 已結束 → 重新開始
    let base = remain;
    if (remain <= 0) {
      base = seconds;
      setRemain(seconds);
      setDone(false);
    }
    setTicking(true);
    let current = base;
    handleRef.current = setInterval(() => {
      current -= 1;
      setRemain(current);
      if (current <= 0) {
        clear();
        setTicking(false);
        setDone(true);
      }
    }, 1000);
  };

  const reset = () => {
    clear();
    setTicking(false);
    setDone(false);
    setRemain(seconds);
  };

  const toggleIcon = done && !ticking ? "fa-bell" : ticking ? "fa-pause" : "fa-play";

  return (
    <div className={"timer" + (done ? " is-done" : "")}>
      <button type="button" className="timer-btn" aria-label={ticking ? "暫停計時" : "開始計時"} onClick={toggle}>
        <i className={"fa-solid " + toggleIcon} />
      </button>
      <span className="timer-display">{fmt(Math.max(remain, 0))}</span>
      <button type="button" className="timer-btn" aria-label="重置計時" onClick={reset}>
        <i className="fa-solid fa-rotate-left" />
      </button>
    </div>
  );
}
