import { useState } from "react";
import { SCENARIO_LABEL, TAG_VOCAB, METHOD_TAGS, coreStatus } from "../data";
import Timer from "./Timer.jsx";
import RecipeCover from "./RecipeCover.jsx";

// 食材列（主食材 / 調味料共用）
// 三態換皮：要買=橘勾＋橘「要買」；冰箱有不買=灰勾＋灰「已有」；其餘不買=空白
// tag＝替代/可省略等狀態標（與採買狀態不同功能，需保留）
function IngredientRow({ name, qty, buying, inFridge, onToggle, cls = "", tag = null, optNote, children }) {
  const checkCls = buying ? " buy" : inFridge ? " have" : "";
  const label = buying ? "要買" : inFridge ? "已有" : "";
  return (
    <div className={"ing-row " + cls}>
      <div className="ing-main">
        <button
          type="button"
          className={"ing-check" + checkCls}
          aria-label={(buying ? "改為不買：" : "加入採買：") + name}
          aria-pressed={buying}
          onClick={onToggle}
        >
          <i className="fa-solid fa-check" />
        </button>
        <div className="name-block">
          <span className="name">{name}</span>
          {optNote !== undefined && (
            <span className="opt-flag" title={optNote || ""}>
              <i className="fa-solid fa-circle-info" /> 可省略
            </span>
          )}
        </div>
        {qty && <span className="qty">{qty}</span>}
        {tag}
        {label && (
          <button
            type="button"
            className={"buy-toggle" + (buying ? "" : " have")}
            aria-hidden="true"
            tabIndex={-1}
            onClick={onToggle}
          >
            {label}
          </button>
        )}
      </div>
      {children}
    </div>
  );
}

export default function RecipeDetail({ recipe, mode, fridge, onBack, onToast, onClearFridge }) {
  const inFridge = mode === "fridge" && fridge.size > 0;
  const status = coreStatus(recipe, fridge);

  // 採買狀態：have 集合＝已有（不用買）。預設依冰箱：在冰箱的主食材→已有，缺的→要買
  const initialHave = () => {
    const init = new Set();
    if (inFridge) status.forEach((d) => d.state !== "MISSING" && init.add(d.name));
    return init;
  };
  const [have, setHave] = useState(initialHave);
  const isBuying = (name) => !have.has(name);
  const allNames = [...recipe.core, ...recipe.seasonings.map((s) => s.name)];
  const buyingCount = allNames.filter(isBuying).length;

  const toggle = (name) =>
    setHave((prev) => {
      const next = new Set(prev);
      next.has(name) ? next.delete(name) : next.add(name);
      return next;
    });

  // 重置：清掉橘勾（要買）→ 冰箱有的回灰勾(已有)、其餘回空白
  const resetBuy = () => {
    setHave(new Set(allNames));
    onToast("已重置採買清單");
  };
  // 預設勾選：把空白選成要買；灰勾(冰箱已有)維持不動
  const selectDefault = () => {
    setHave((prev) => new Set([...prev].filter((n) => inFridge && fridge.has(n))));
    onToast("已預設勾選要買");
  };

  // 清除冰箱已有：清空全域「我冰箱有」，全部回到「要買」
  const clearFridge = () => {
    onClearFridge?.();
    setHave(new Set());
    onToast("已清除冰箱食材");
  };

  const copyBuy = () => {
    const all = [...recipe.core, ...recipe.seasonings.map((s) => s.name)];
    const items = all
      .filter((n) => isBuying(n))
      .map((n) => {
        const q = recipe.quantities[n] || "";
        return `• ${n}${q ? ` ${q}` : ""}`;
      });
    if (items.length === 0) {
      onToast("需購食材都已標示為已有");
      return;
    }
    const text = `🛒 ${recipe.title} 需購食材\n${items.join("\n")}`;
    navigator.clipboard
      .writeText(text)
      .then(() => onToast(`已複製 ${items.length} 項`))
      .catch(() => onToast("複製失敗"));
  };

  // 替代/可省略狀態標（與採買勾不同功能）：僅依食材選模式顯示
  const tagFor = (d) => {
    if (!inFridge) return null;
    if (d.state === "SUBBED") return <span className="tag-mini">用 {d.via}</span>;
    if (d.state === "OPTIONAL") return <span className="tag-mini tag-mini--opt">可不加</span>;
    return null;
  };
  const clsFor = (d) => (inFridge && d.state === "SUBBED" ? "subbed" : "");

  const renderSteps = (arr) =>
    arr.map((s, i) => (
      <div className="step" key={i}>
        <div className="step-no">{i + 1}</div>
        <div className="step-body">
          <div className="step-text">{s.text}</div>
          {s.timerSec ? <Timer seconds={s.timerSec} /> : null}
        </div>
      </div>
    ));

  return (
    <main className="view">
      <button type="button" className="btn btn-secondary btn-block" onClick={onBack}>
        <i className="fa-solid fa-arrow-left" /> 回列表
      </button>

      <RecipeCover recipe={recipe} className="detail-cover" />

      <div className="detail-head">
        <h2>{recipe.title}</h2>
        <div className="card-meta">
          <span className="badge badge-info">{recipe.servings}</span>
          {(recipe.scenarios || []).map((s) => (
            <span key={s} className="badge badge-info">
              {SCENARIO_LABEL[s] || s}
            </span>
          ))}
          {METHOD_TAGS.filter((t) => (recipe.tags || []).includes(t)).map((t) => (
            <span key={t} className="badge badge-method">
              <i className="fa-solid fa-utensils" /> {TAG_VOCAB[t]}
            </span>
          ))}
        </div>
        {recipe.sourceUrl && (
          <a className="btn btn-secondary source-link" href={recipe.sourceUrl} target="_blank" rel="noopener">
            <i className="fa-brands fa-youtube" /> 看原始影片
          </a>
        )}
      </div>

      <div className="block detail-block">
        <div className="section-title">
          <i className="fa-solid fa-list-check" /> 食材清單
        </div>
        <div className="ing-block">
          <div className="ing-sub-label">
            <i className="fa-solid fa-bowl-food" /> 主食材
          </div>
          {status.map((d) => {
            const rep = recipe.replaceable.find((x) => x.original === d.name);
            return (
              <IngredientRow
                key={d.name}
                name={d.name}
                qty={recipe.quantities[d.name] || ""}
                buying={isBuying(d.name)}
                inFridge={inFridge && fridge.has(d.name)}
                onToggle={() => toggle(d.name)}
                cls={clsFor(d)}
                tag={tagFor(d)}
              >
                {rep && (
                  <div className="ing-subs">
                    <span className="subs-label">可替換</span>
                    {rep.substitutes.map((s) => {
                      if (s === "不加") {
                        return (
                          <span key={s} className="sub-chip skip">
                            可不加
                          </span>
                        );
                      }
                      const on = fridge.has(s);
                      return (
                        <span key={s} className={"sub-chip" + (on ? " on" : "")}>
                          {on && <i className="fa-solid fa-check" />} {s}
                        </span>
                      );
                    })}
                  </div>
                )}
              </IngredientRow>
            );
          })}

          <div className="ing-sub-label">
            <i className="fa-solid fa-bottle-droplet" /> 調味料
          </div>
          {recipe.seasonings.map((s) => (
            <IngredientRow
              key={s.name}
              name={s.name}
              qty={recipe.quantities[s.name] || ""}
              buying={isBuying(s.name)}
              inFridge={inFridge && fridge.has(s.name)}
              onToggle={() => toggle(s.name)}
              optNote={s.optional ? s.note || "" : undefined}
            />
          ))}
        </div>

        <div className="copy-bar">
          {buyingCount > 0 ? (
            <button type="button" className="btn btn-secondary btn-clear" onClick={resetBuy}>
              <i className="fa-solid fa-rotate-left" /> 重置
            </button>
          ) : (
            <button type="button" className="btn btn-secondary btn-clear" onClick={selectDefault}>
              <i className="fa-solid fa-check-double" /> 預設勾選
            </button>
          )}
          <button type="button" className="btn btn-primary btn-copy" onClick={copyBuy} disabled={buyingCount === 0}>
            <i className="fa-solid fa-copy" /> 複製需購食材
          </button>
        </div>

        {inFridge && (
          <button type="button" className="btn btn-ghost btn-block" onClick={clearFridge}>
            <i className="fa-solid fa-basket-shopping" /> 清除冰箱已有
          </button>
        )}
      </div>

      <hr className="detail-divider" />

      {recipe.prepGuideRef && recipe.prepGuideRef.length > 0 && (
        <div className="block detail-block">
          <div className="section-title">
            <i className="fa-solid fa-box-open" /> 食材備料
          </div>
          <div className="prep-guide-chips">
            {recipe.prepGuideRef.map((p) => (
              <span key={p} className="badge badge-ing">
                {p}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="block detail-block">
        <div className="section-title">
          <i className="fa-solid fa-clipboard-list" /> 前置準備
        </div>
        <div className="step-list">{renderSteps(recipe.steps.prep)}</div>
      </div>

      <div className="block detail-block">
        <div className="section-title">
          <i className="fa-solid fa-fire-burner" /> 開始料理
        </div>
        <div className="step-list">{renderSteps(recipe.steps.cook)}</div>
      </div>

      <button type="button" className="btn btn-secondary btn-block" onClick={onBack}>
        <i className="fa-solid fa-arrow-left" /> 回列表
      </button>
    </main>
  );
}
