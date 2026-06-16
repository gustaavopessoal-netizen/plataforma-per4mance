# -*- coding: utf-8 -*-
"""Importa os e-books da pasta do Google Drive do Gustavo para a plataforma:
- baixa cada PDF para /private/ebooks/<id>.pdf  (entrega protegida pela rota /api/ebooks)
- gera a capa (1a pagina) em /public/ebooks/capas/<id>.png
- reescreve src/data/ebooks.ts com a divisao atleta/treinador
"""
import os, ssl, urllib.request

# Esta máquina tem antivírus/proxy que intercepta HTTPS → usa o trust store do Windows.
try:
    import truststore
    truststore.inject_into_ssl()
    CTX = None
except Exception:
    CTX = ssl.create_default_context()
    CTX.check_hostname = False
    CTX.verify_mode = ssl.CERT_NONE

ROOT = r"C:\Users\gusta\plataforma-per4mance"
PRIV = os.path.join(ROOT, "private", "ebooks")
CAPAS = os.path.join(ROOT, "public", "ebooks", "capas")
os.makedirs(PRIV, exist_ok=True)
os.makedirs(CAPAS, exist_ok=True)

# (drive_id, slug/id, titulo, publico)
EBOOKS = [
    # ----- ATLETAS -----
    ("1cz6xeQqdrIgWYWMX9GJraWh3T2Tm3dXZ", "voltar-forte", "Voltar Mais Forte", "atleta"),
    ("1D56mMakZYzQ-AwwF8H0M5M8iHzOI9fKZ", "sono-atleta", "O Atleta que Dorme, Ganha", "atleta"),
    ("1Smo-DiQmhCQPJ5KKElmTccAW5cD3OIhq", "corpo-historia", "Seu Corpo Conta a Sua História", "atleta"),
    ("1aRzJoduq9qxCWuvQHXTWokQGl__qsGKL", "fitness-40", "Fitness Após os 40", "atleta"),
    ("1JqIqvCjL4JGktG7y__uleKAwBjcixEc9", "frio-quente", "Frio ou Quente?", "atleta"),
    ("1Tsp8p7BEYa2WMfWwe6ku7pvBM6LVbbTf", "mental-2", "A Vantagem Mental do 2%", "atleta"),
    ("1wM0k-xeo0fgFx55SQMP_v_pDrg4fVHs8", "estresse", "Estresse Vira Peso", "atleta"),
    ("1BhA_vzWOHk2u9VjCUWouk4t0pDqEjfV5", "aquecimento", "Aquecimento que Ninguém Faz Direito", "atleta"),
    ("19f7F449mEHoqnJ3mQC0k0yav86mWzmJX", "velocidade", "Velocidade Não se Nasce, se Treina", "atleta"),
    ("1QWqEdrowk2T-NWor48OOy0tHBvGaL0yw", "mobilidade", "Mobilidade: o Novo Alongamento", "atleta"),
    ("1hk12oF_z9qT0TcOC6HLivCJ1ga5G6EyK", "numero", "O Número que Importa", "atleta"),
    ("1H21N6DZOPzrJpwF4XDrBt9IlA52ZCHHj", "lesao-invisivel", "A Lesão que Você Não Vê", "atleta"),
    ("1AtjUN3PMD2F6d_xUXFH7x41hXbFCCo8m", "dor-nao-parar", "Dor Não é Sinal de Parar", "atleta"),
    ("1u8mekvT-VnAe9MoqxSKzv2brI4Q146Mm", "tornozelo", "O Tornozelo Esquecido", "atleta"),
    ("11RMM6Okr8ts-gVLCgYIRqznXU29tingG", "proteina", "Proteína", "atleta"),
    ("1G3ABG-qi5CM8CAj32uFrqwahWw6H44N2", "treino-funcional", "Treinamento Funcional na Prática", "atleta"),
    ("1vPh_Vo9Im5Ozhrmj1QUWOL33fUVdJx9k", "semana-descarga", "A Semana de Descarga", "atleta"),
    ("1MxWQKL3htwj8vDxNJwSU2lNfnWLgzNYj", "protocolo-recuperacao", "Protocolo de Recuperação Esportiva", "atleta"),
    # ----- TREINADORES / PROFISSIONAIS -----
    ("1YehB7_GeES-7MrBtOglYsqeMHmG6p_oa", "gestao-academia", "Gestão de Academia", "treinador"),
    ("11ythRbI_JADV3ioCBApcVjYymnkYQX--", "marketing-personal", "Marketing para Personal Trainer", "treinador"),
    ("1lKn5UreYtSp4gc8xNEnZjr3j0YB2HAnH", "fisiologia", "Fisiologia do Exercício", "treinador"),
    ("1Y-0T875hSIPKIJsbgtAyGFbpGjfyo8VR", "prescricao", "Prescrição de Exercícios", "treinador"),
    ("13L4Yk9Xyqlne7wSUF_d5OD-oV9NMS2n1", "avaliacao-fisica", "Avaliação Física Completa", "treinador"),
    ("1r5OJBs6fvQGuLz6TL-W7_JSMwVK3PpQ7", "biomecanica", "Biomecânica Aplicada", "treinador"),
    ("1xaHdVUodKjrIrXsmtcS4-wUMZcojnv9-", "periodizacao", "Periodização do Treinamento", "treinador"),
    ("1HNA7j21mzyhBmt_qY3BsrNjE_VCuxqFv", "faturar-mais", "Faturar Mais", "treinador"),
    ("169XbEVVLXLii9jlXsC3b7nYaK3SFbwx7", "avalie-antes", "Avalie Antes de Treinar", "treinador"),
    ("10818L_Y_jm1JDqh8uVfLUB-pu6vWqZkd", "personal-independente", "O Personal que Não Depende da Academia", "treinador"),
]

CORES = ["#b5e000", "#1d6fe8", "#f26d40", "#ef4444", "#00c8f0",
         "#9333ea", "#ff2d87", "#38bdf8", "#22c55e", "#f5c518"]


def baixar(drive_id, dest):
    url = f"https://drive.google.com/uc?export=download&id={drive_id}"
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=180, context=CTX) as r:
        data = r.read()
    if data[:5] != b"%PDF-":
        raise RuntimeError(f"NAO veio PDF ({len(data)} bytes) para {drive_id}")
    with open(dest, "wb") as f:
        f.write(data)
    return len(data)


import fitz  # PyMuPDF

def capa(pdf_path, png_path):
    doc = fitz.open(pdf_path)
    pix = doc[0].get_pixmap(matrix=fitz.Matrix(2.0, 2.0))
    pix.save(png_path)
    doc.close()


rows = []
falhas = []
for i, (did, slug, titulo, publico) in enumerate(EBOOKS):
    try:
        n = baixar(did, os.path.join(PRIV, slug + ".pdf"))
        capa(os.path.join(PRIV, slug + ".pdf"), os.path.join(CAPAS, slug + ".png"))
        rows.append((slug, titulo, publico, CORES[i % len(CORES)]))
        print(f"OK  {slug:24s} {n:>9d} bytes  [{publico}]")
    except Exception as e:
        falhas.append((slug, str(e)))
        print(f"ERRO {slug}: {e}")

# limpa o arquivo de teste
t = os.path.join(PRIV, "_teste_download.pdf")
if os.path.exists(t):
    os.remove(t)

if not rows:
    raise SystemExit("Nenhum PDF baixado — ebooks.ts NAO foi alterado. Veja os erros acima.")

# ---- reescreve src/data/ebooks.ts ----
def esc(s):
    return s.replace("\\", "\\\\").replace('"', '\\"')

L = []
L.append("// E-books PER4MANCE — importados da pasta do Gustavo (Drive).")
L.append("// PDFs gateados em /private/ebooks/<id>.pdf ; capas em /public/ebooks/capas/<id>.png.")
L.append("// 'publico' separa quem aparece no bloco de Atletas x Profissionais na home.")
L.append("")
L.append("export type Ebook = {")
L.append("  id: string;")
L.append("  titulo: string;")
L.append('  publico: "atleta" | "treinador";')
L.append("  categoria: \"Recuperação\" | \"Performance\" | \"Mente\";")
L.append("  cor: string;")
L.append("  arquivo: string;")
L.append("  descricao: string;")
L.append("};")
L.append("")
L.append("export const ebooks: Ebook[] = [")
for slug, titulo, publico, cor in rows:
    cat = "Performance" if publico == "treinador" else "Recuperação"
    desc = f"E-book PER4MANCE — {titulo}."
    L.append(
        f'  {{ id: "{slug}", titulo: "{esc(titulo)}", publico: "{publico}", '
        f'categoria: "{cat}", cor: "{cor}", arquivo: "/ebooks/{slug}.pdf", '
        f'descricao: "{esc(desc)}" }},'
    )
L.append("];")
L.append("")
L.append("export function getEbook(id: string): Ebook | undefined {")
L.append("  return ebooks.find((e) => e.id === id);")
L.append("}")
with open(os.path.join(ROOT, "src", "data", "ebooks.ts"), "w", encoding="utf-8") as f:
    f.write("\n".join(L) + "\n")

print("\n==============================")
print(f"e-books importados: {len(rows)}  | atletas: {sum(1 for r in rows if r[2]=='atleta')}  | treinadores: {sum(1 for r in rows if r[2]=='treinador')}")
if falhas:
    print("FALHAS:", falhas)
print("ebooks.ts reescrito.")
