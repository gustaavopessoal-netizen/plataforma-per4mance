import json, re, io

SRC = r"C:\Users\gusta\recuperacao-esportiva\producao-videos\FICHAS-6-EXERCICIOS.md"
DST = r"C:\Users\gusta\plataforma-per4mance\src\data\fichas.ts"

NOME2ID = {
    "JOELHO": "joelho", "TORNOZELO": "tornozelo", "LOMBAR": "lombar",
    "POSTERIOR": "posterior", "PUBALGIA": "pubalgia", "PANTURRILHA": "panturrilha",
    "QUADRIL": "quadril", "OMBRO": "ombro", "QUADRÍCEPS": "quadriceps",
}

fichas = {}
curso = None
ficha = None

cab = re.compile(r"^###\s+F(\d)\s+\(Dias\s+([\d\-]+)\s+—\s+(Fase\s+\d)\):\s*(.+?)\s*$")

with io.open(SRC, encoding="utf-8") as f:
    for raw in f:
        line = raw.rstrip("\n")
        if line.startswith("## "):
            nome = line[3:].strip()
            cid = NOME2ID.get(nome)
            curso = cid
            if cid:
                fichas[cid] = []
            ficha = None
            continue
        m = cab.match(line)
        if m and curso:
            ficha = {
                "num": int(m.group(1)),
                "dias": m.group(2),
                "fase": m.group(3),
                "titulo": m.group(4),
                "exercicios": [],
            }
            fichas[curso].append(ficha)
            continue
        # linha de tabela de exercício
        if line.startswith("|") and ficha is not None:
            cols = [c.strip() for c in line.strip().strip("|").split("|")]
            if len(cols) >= 4 and cols[0].isdigit():
                ficha["exercicios"].append({
                    "codigo": cols[1],
                    "nome": cols[2],
                    "prescricao": cols[3],
                })

# validação rápida
total = sum(len(v) for v in fichas.values())
ex = sum(len(fc["exercicios"]) for v in fichas.values() for fc in v)
print(f"cursos={len(fichas)} fichas={total} exercicios={ex}")
for cid, v in fichas.items():
    print(f"  {cid}: {len(v)} fichas, " + ", ".join(str(len(fc['exercicios'])) for fc in v) + " ex")

body = json.dumps(fichas, ensure_ascii=False, indent=2)
ts = (
    "// GERADO automaticamente de recuperacao-esportiva/producao-videos/FICHAS-6-EXERCICIOS.md\n"
    "// Fonte de verdade do MÉTODO real do Gustavo (54 fichas: 9 protocolos × 6 fichas de 15 dias).\n"
    "// Para regenerar: python tools/parse-fichas.py\n\n"
    "export type Exercicio = { codigo: string; nome: string; prescricao: string; videoUrl?: string };\n"
    "export type Ficha = {\n"
    "  num: number;\n"
    "  dias: string;\n"
    "  fase: string;\n"
    "  titulo: string;\n"
    "  exercicios: Exercicio[];\n"
    "};\n\n"
    "export const FICHAS: Record<string, Ficha[]> = " + body + ";\n"
)
with io.open(DST, "w", encoding="utf-8") as f:
    f.write(ts)
print("OK ->", DST)
