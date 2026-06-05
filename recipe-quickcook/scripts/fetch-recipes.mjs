// fetch-recipes.mjs — 批次抓 YouTube 字幕 + 描述，產生可貼給 AI 的 prompt
//
// 用法：
//   1. 安裝 yt-dlp（見 scripts/README.md）
//   2. 把要抓的 YT 連結填進 scripts/urls.txt（一行一個，# 開頭為註解）
//   3. 在 recipe-quickcook 目錄執行：node scripts/fetch-recipes.mjs
//   4. 產出：
//      - scripts/raw/<videoId>.txt      每支影片的標題/描述/逐字稿
//      - scripts/prompt-batch.txt       直接貼給 AI 的完整 prompt（含標準名清單）
//
// 結構化交給 AI：把 prompt-batch.txt 全文貼給對話，AI 回傳符合 schema 的 JS。

import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync, rmSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { INGREDIENTS } from "../data/ingredients.js";

const here = dirname(fileURLToPath(import.meta.url));
const rawDir = join(here, "raw");
const urlsFile = join(here, "urls.txt");

// ── 前置檢查 ──
function ensureYtDlp() {
  try {
    execFileSync("yt-dlp", ["--version"], { stdio: "pipe" });
  } catch {
    console.error("✗ 找不到 yt-dlp，請先安裝（見 scripts/README.md）：\n  winget install yt-dlp.yt-dlp  或  scoop install yt-dlp");
    process.exit(1);
  }
}

function readUrls() {
  if (!existsSync(urlsFile)) {
    console.error(`✗ 找不到 ${urlsFile}，請建立並填入 YT 連結（一行一個）`);
    process.exit(1);
  }
  return readFileSync(urlsFile, "utf8")
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith("#"));
}

const videoId = (url) => (url.match(/(?:v=|youtu\.be\/|embed\/)([\w-]{11})/) || [])[1] || null;

// 清理 .vtt → 純文字（去時間軸/標籤/重複行）
function cleanVtt(vtt) {
  const seen = new Set();
  const out = [];
  for (let line of vtt.split("\n")) {
    // 先還原 HTML 實體（人工字幕常見 &lt;font&gt; 包裝），再去標籤
    line = line
      .replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").replace(/&#39;/g, "'").replace(/&quot;/g, '"')
      .replace(/<[^>]+>/g, "")
      .trim();
    if (!line) continue;
    if (line === "WEBVTT" || line.startsWith("Kind:") || line.startsWith("Language:")) continue;
    if (line.includes("-->")) continue;
    if (/^\d+$/.test(line)) continue; // cue 編號
    if (seen.has(line)) continue;     // 自動字幕常重複
    seen.add(line);
    out.push(line);
  }
  return out.join("\n");
}

function fetchOne(url) {
  const id = videoId(url);
  if (!id) { console.warn(`⚠ 略過無法解析的連結：${url}`); return null; }

  // 用乾淨的單片 watch URL，避免 &list=/&index= 讓 yt-dlp 去追整個播放清單（撞到私人影片會失敗）
  const watchUrl = `https://www.youtube.com/watch?v=${id}`;

  // metadata（標題 + 描述）
  let title = "", description = "";
  try {
    const json = JSON.parse(execFileSync("yt-dlp", ["--skip-download", "--no-warnings", "--dump-single-json", watchUrl], { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 }));
    title = json.title || "";
    description = json.description || "";
  } catch (e) {
    console.warn(`⚠ ${id} 取得 metadata 失敗：${e.message.split("\n")[0]}`);
  }

  // 字幕（優先繁中，退而求其次簡中/英；含自動字幕）
  let transcript = "";
  const subTmpl = join(rawDir, `${id}.%(ext)s`);
  const ownVtts = () => readdirSync(rawDir).filter((f) => f.startsWith(`${id}.`) && f.endsWith(".vtt"));
  // 下載前先清掉此 id 的殘留 vtt（避免上次中斷留下的舊檔被誤讀）
  ownVtts().forEach((f) => rmSync(join(rawDir, f)));
  try {
    execFileSync("yt-dlp", [
      "--skip-download", "--no-warnings",
      "--write-subs", "--write-auto-subs",
      "--sub-langs", "zh-Hant,zh-TW,zh-Hans,zh,en",
      "--sub-format", "vtt",
      "-o", subTmpl, watchUrl,
    ], { stdio: "pipe" });
    const vttFiles = ownVtts();
    // 偏好繁中字幕
    vttFiles.sort((a, b) => (/zh-(Hant|TW)/.test(b) ? 1 : 0) - (/zh-(Hant|TW)/.test(a) ? 1 : 0));
    if (vttFiles[0]) transcript = cleanVtt(readFileSync(join(rawDir, vttFiles[0]), "utf8"));
  } catch (e) {
    console.warn(`⚠ ${id} 取得字幕失敗（可能無字幕）：${e.message.split("\n")[0]}`);
  } finally {
    // 無論成功失敗都清掉此 id 的 vtt，只留彙整 txt（防殘留汙染下一輪）
    ownVtts().forEach((f) => rmSync(join(rawDir, f)));
  }

  const body = `# ${title}\nsourceUrl: https://www.youtube.com/watch?v=${id}\n\n【影片描述】\n${description || "（無）"}\n\n【逐字稿】\n${transcript || "（無字幕，請以描述為主）"}\n`;
  writeFileSync(join(rawDir, `${id}.txt`), body, "utf8");
  console.log(`✓ ${id} ${title}`);
  return { id, title, body };
}

// ── 產生貼給 AI 的 prompt ──
function buildPrompt(items) {
  const names = INGREDIENTS.map((i) => i.name).join("、");
  const head = `你是料理資料結構化助手。下面有多支 YouTube 料理影片的「描述 + 逐字稿」。
請每支各輸出一個符合下方 schema 的 JS 物件，彙整成一個 RECIPES 陣列片段，不要前言或說明。

規則：
- 食材一律使用「標準名清單」內名稱；清單外的食材請在最後另列「需新增食材」清單回報，先不要自創。
- core = 不可或缺的主食材（僅蛋白質/蔬菜/主食），純標準名、不含份量；嚴禁放調味料。
- replaceable = {original, substitutes:[...]}，original 須為 core 內食材；可省略的主食材在 substitutes 加 "不加"。
- seasonings = 所有調味料，物件 {name, optional?, note?}；含酒（給孩子）或不易取得的標 optional:true 並寫 note。
- quantities = 食材標準名→份量字串，如 {"雞胸肉":"350g"}。
- steps 分 prep（開火前洗切醃調醬）與 cook（熱鍋開火後）兩段，每步 {text, timerSec}；計時填秒數否則 null。
- tags 只能用：finger-food, heat-stable, no-fresh, freezer-friendly, quick, one-pot, kid-friendly。
- sourceUrl 用每支影片標示的網址；coverImage 一律留空字串。

標準名清單：
${names}

輸出格式（每支一個物件）：
{
  id: "recipe_<videoId>", title: "", sourceUrl: "", coverImage: "",
  servings: "", scenarios: [], tags: [],
  ingredients: { core: [], replaceable: [{original:"",substitutes:[""]}], seasonings: [{name:"",optional:false}] },
  quantities: {}, prepGuideRef: [],
  steps: { prep: [{text:"",timerSec:null}], cook: [{text:"",timerSec:null}] },
}

────────── 影片資料 ──────────
`;
  const bodies = items.map((it, i) => `\n═════ 影片 ${i + 1}（id: ${it.id}）═════\n${it.body}`).join("\n");
  return head + bodies;
}

// ── main ──
ensureYtDlp();
mkdirSync(rawDir, { recursive: true });
const urls = readUrls();
console.log(`抓取 ${urls.length} 支影片…\n`);
const items = urls.map(fetchOne).filter(Boolean);
const promptPath = join(here, "prompt-batch.txt");
writeFileSync(promptPath, buildPrompt(items), "utf8");
console.log(`\n完成 ${items.length} 支。`);
console.log(`→ 逐字稿存於 scripts/raw/`);
console.log(`→ 貼給 AI 的 prompt：scripts/prompt-batch.txt（把全文貼進對話即可）`);
