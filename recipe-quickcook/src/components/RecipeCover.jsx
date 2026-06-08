import { coverImageUrl, placeholderColor } from "../data";

// 封面：有真實圖 → 背景圖；無圖 → 品牌色底 + FA fire-burner 佔位
export default function RecipeCover({ recipe, className }) {
  const url = coverImageUrl(recipe);

  if (url) {
    // 動態圖片網址，依 Coding Rules 例外允許動態 inline 帶值
    return <div className={className} style={{ backgroundImage: `url('${url}')` }} />;
  }

  const { bg, fg } = placeholderColor(recipe);
  return (
    <div
      className={className + " cover-placeholder"}
      style={{ "--ph-bg": bg, "--ph-fg": fg }}
      role="img"
      aria-label={`${recipe.title}（待補食譜照片）`}
    >
      <i className="fa-solid fa-fire-burner" aria-hidden="true" />
    </div>
  );
}
