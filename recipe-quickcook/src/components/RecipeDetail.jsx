import { useState } from "react";
import { SCENARIO_LABEL, TAG_VOCAB, METHOD_TAGS, coreStatus } from "../data";
import Timer from "./Timer.jsx";
import RecipeCover from "./RecipeCover.jsx";

// 食材列（主食材 / 調味料共用）
function IngredientRow({ name, qty, checked, onToggle, cls = "", tag = null, optNote, children }) {
  return (
    <div className={"ing-row " + cls}>
      <div className="ing-main">
        <button
          type="button"
          className={"ing-check" + (checked ? " checked" : "")}
          aria-label={checked ? "已加入採買" : "加入採買"}
          aria-pressed={checked}
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
        <span className="qty">{qty}</span>
        {tag}
      </div>
      {children}
    </div>
  );
}

export default function RecipeDetail({ recipe, mode, fridge, onBack, onToast, onClearFridge }) {
  const inFridge = mode === "fridge" && fridge.size > 0;
  const status = coreStatus(recipe, fridge);

  // 初始採買勾選：依食材選模式下，缺的主食材預設勾起
  const [checked, setChecked] = useState(() => {
    const init = new Set();
    if (inFridge) status.forEach((d) => d.state === "MISSING" && init.add(d.name));
    return init;
  });

  const toggle = (name) =>
    setChecked((prev) => {
      const next = new Set(prev);
      next.has(name) ? next.delete(name) : next.add(name);
      return next;
    });

  const clearChecked = () => {
    if (checked.size === 0) {
      onToast("還沒勾選要買的食材");
      return;
    }
    setChecked(new Set());
    onToast("已清空採買勾選");
  };

  // 清除冰箱已有：清空全域「我冰箱有」，主食材全部回到「要買」並預設勾起
  const clearFridge = () => {
    onClearFridge?.();
    setChecked(new Set(recipe.core));
    onToast("已清除冰箱食材");
  };

  const copyBuy = () => {
    const all = [...recipe.core, ...recipe.seasonings.map((s) => s.name)];
    const items = all
      .filter((n) => checked.has(n))
      .map((n) => {
        const q = recipe.quantities[n] || "";
        return `• ${n}${q ? ` ${q}` : ""}`;
      });
    if (items.length === 0) {
      onToast("還沒勾選要買的食材");
      return;
    }
    const text = `🛒 ${recipe.title} 採買清單\n${items.join("\n")}`;
    navigator.clipboard
      .writeText(text)
      .then(() => onToast(`已複製 ${items.length} 項`))
      .catch(() => onToast("複製失敗"));
  };

  const tagFor = (d) => {
    if (!inFridge) return null;
    if (d.state === "HAVE") return <span className="tag-mini">有</span>;
    if (d.state === "SUBBED") return <span className="tag-mini">用 {d.via}</span>;
    if (d.state === "OPTIONAL") return <span className="tag-mini tag-mini--opt">可不加</span>;
    return <span className="tag-mini tag-mini--buy">要買</span>;
  };
  const clsFor = (d) => {
    if (!inFridge) return "";
    if (d.state === "HAVE") return "have";
    if (d.state === "SUBBED") return "subbed";
    if (d.state === "MISSING") return "missing";
    return "";
  };

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
                checked={checked.has(d.name)}
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
              checked={checked.has(s.name)}
              onToggle={() => toggle(s.name)}
              optNote={s.optional ? s.note || "" : undefined}
            />
          ))}
        </div>

        <div className="copy-bar">
          <button type="button" className="btn btn-secondary btn-clear" onClick={clearChecked}>
            <i className="fa-solid fa-eraser" /> 清空
          </button>
          <button type="button" className="btn btn-primary btn-copy" onClick={copyBuy}>
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
            <i className="fa-solid fa-box-open" /> 用到的備餐元件
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
