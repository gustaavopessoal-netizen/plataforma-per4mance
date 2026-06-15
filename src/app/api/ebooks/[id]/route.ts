import { NextResponse } from "next/server";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { getAcessos } from "@/data/entitlements";
import { ebookLiberado, cursoLiberado } from "@/data/access";
import { ebooks } from "@/data/ebooks";
import { getCursoIdsDoEbook } from "@/data/ebooks-curso";

// Depende da sessão do usuário → sempre dinâmica, nunca cacheada.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Entrega o PDF de um e-book SOMENTE para quem tem acesso.
 * Os arquivos ficam em /private/ebooks (fora de /public), então não há URL
 * pública: o único caminho é por aqui, e aqui a compra é conferida NO SERVIDOR.
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  // valida o id contra o catálogo (impede path traversal tipo ../../)
  const ebook = ebooks.find((e) => e.id === id);
  if (!ebook) return new NextResponse("E-book não encontrado.", { status: 404 });

  // 🔒 gate de verdade: checagem de acesso no servidor.
  // Libera se: tem a Coleção/comprou o ebook OU tem um curso vinculado a ele.
  const acessos = await getAcessos();
  let permitido = ebookLiberado(acessos, id);
  if (!permitido) {
    const cursoIds = await getCursoIdsDoEbook(id);
    permitido = cursoIds.some((cid) => cursoLiberado(acessos, cid));
  }
  if (!permitido) {
    return new NextResponse("Bloqueado — compre o curso ou a Coleção para baixar este e-book.", {
      status: 403,
    });
  }

  const filePath = path.join(process.cwd(), "private", "ebooks", `${id}.pdf`);
  try {
    const file = await readFile(filePath);
    return new NextResponse(new Uint8Array(file), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${id}.pdf"`,
        "Cache-Control": "private, no-store",
      },
    });
  } catch {
    return new NextResponse("Arquivo indisponível.", { status: 404 });
  }
}
