// Gera os arquivos HTML das capas dos e-books (600x800) para depois
// virarem PNG via Chrome headless. Rode: node tools/make-covers.mjs
import { writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "_covers");
mkdirSync(outDir, { recursive: true });

const EBOOKS = [
  { slug: "protocolo", titulo: "Protocolo de Recuperação Esportiva", cat: "Recuperação", cor: "#b5e000", icon: "📋" },
  { slug: "sono", titulo: "Sono & Performance", cat: "Recuperação", cor: "#1d6fe8", icon: "🌙" },
  { slug: "aquece", titulo: "Aquecimento que Previne Lesão", cat: "Recuperação", cor: "#f97316", icon: "🔥" },
  { slug: "volta", titulo: "Volta à Calma: Recovery Pós-Treino", cat: "Recuperação", cor: "#ef4444", icon: "🧘" },
  { slug: "frio", titulo: "Recuperação no Frio", cat: "Recuperação", cor: "#00c8f0", icon: "❄️" },
  { slug: "estresse", titulo: "Estresse & Recuperação", cat: "Mente", cor: "#9333ea", icon: "🌀" },
  { slug: "mente", titulo: "Mente de Alta Performance", cat: "Mente", cor: "#ff2d87", icon: "🧠" },
  { slug: "f40", titulo: "Alta Performance Após os 40", cat: "Performance", cor: "#38bdf8", icon: "🏆" },
  { slug: "corpo", titulo: "Leitura Corporal do Atleta", cat: "Performance", cor: "#22c55e", icon: "🫀" },
  { slug: "numero", titulo: "Os Números da Recuperação", cat: "Performance", cor: "#f5c518", icon: "📊" },
  { slug: "ebook", titulo: "Guia PER4MANCE de Recuperação", cat: "Recuperação", cor: "#f26d40", icon: "📘" },
];

function cover({ titulo, cat, cor, icon }) {
  return `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,600;0,700;0,800;1,800;1,900&family=Barlow:wght@400;500&display=swap" rel="stylesheet">
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  html,body { width:600px; height:800px; }
  .cover {
    width:600px; height:800px; position:relative; overflow:hidden;
    background:
      repeating-linear-gradient(-45deg, rgba(255,255,255,.02) 0 1px, transparent 1px 46px),
      radial-gradient(130% 80% at 100% 0%, ${cor}30 0%, transparent 55%),
      linear-gradient(160deg, #0c0d11 0%, #07080c 100%);
    font-family:'Barlow Condensed', sans-serif; color:#fff;
    padding:56px 52px; display:flex; flex-direction:column; justify-content:space-between;
  }
  .bar { position:absolute; top:0; left:0; width:14px; height:100%; background:${cor}; }
  .icon { position:absolute; right:34px; top:150px; font-size:260px; line-height:1; opacity:.10; filter:grayscale(.2); }
  .top { position:relative; z-index:2; display:flex; align-items:center; justify-content:space-between; }
  .brand { font-weight:800; font-size:30px; letter-spacing:.04em; }
  .brand b { color:${cor}; }
  .pill { font-weight:800; font-size:13px; letter-spacing:.28em; text-transform:uppercase;
          background:${cor}; color:#000; padding:6px 12px; border-radius:4px; }
  .mid { position:relative; z-index:2; }
  .cat { font-weight:700; font-size:17px; letter-spacing:.3em; text-transform:uppercase; color:${cor}; }
  .title { font-weight:800; font-style:italic; text-transform:uppercase; line-height:.92;
           font-size:74px; margin-top:14px; max-width:480px; }
  .rule { height:5px; width:90px; background:${cor}; margin-top:26px; border-radius:3px; }
  .bottom { position:relative; z-index:2; display:flex; align-items:flex-end; justify-content:space-between; }
  .by { font-family:'Barlow', sans-serif; font-weight:500; font-size:18px; color:#aeb4c0; }
  .by span { color:#fff; font-weight:700; }
  .tag { font-family:'Barlow', sans-serif; font-style:italic; font-size:15px; color:#7e8694; text-align:right; }
</style></head>
<body>
  <div class="cover">
    <div class="bar"></div>
    <div class="icon">${icon}</div>
    <div class="top">
      <div class="brand">PER<b>4</b>MANCE</div>
      <div class="pill">E-book</div>
    </div>
    <div class="mid">
      <div class="cat">${cat}</div>
      <div class="title">${titulo}</div>
      <div class="rule"></div>
    </div>
    <div class="bottom">
      <div class="by">by <span>Gustavo Vieira</span></div>
      <div class="tag">Recuperação<br>& Performance</div>
    </div>
  </div>
</body></html>`;
}

for (const e of EBOOKS) {
  writeFileSync(join(outDir, `${e.slug}.html`), cover(e), "utf8");
}
console.log(`OK: ${EBOOKS.length} capas geradas em ${outDir}`);
