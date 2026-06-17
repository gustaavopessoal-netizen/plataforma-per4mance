import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getProduto } from "@/data/products";
import { getCurso, BUNDLE, BUNDLE_PROF, COLECAO_PROF_ID, protocolos, formatBRL } from "@/data/courses";
import { CheckoutGuest } from "@/components/CheckoutGuest";

export const dynamic = "force-dynamic";

// Dados de exibição (nome, cor, parcelas) a partir do itemId.
function display(id: string) {
  if (id === "colecao") {
    return {
      titulo: BUNDLE.titulo,
      sub: BUNDLE.subtitulo,
      cor: "#1d6fe8",
      parcelas: BUNDLE.parcelas,
      capa: "/produtos/p1.png" as string | null,
    };
  }
  if (id === COLECAO_PROF_ID) {
    return {
      titulo: BUNDLE_PROF.titulo,
      sub: BUNDLE_PROF.subtitulo,
      cor: "#1d6fe8",
      parcelas: BUNDLE_PROF.parcelas,
      capa: "/produtos/avaliacao-postural.png" as string | null,
    };
  }
  const c = getCurso(id);
  if (c) {
    return {
      titulo: `${c.regiao} ${c.tagline}`,
      sub: c.subtitulo,
      cor: c.cor,
      parcelas: `5x de ${formatBRL(c.preco / 5)}`,
      capa: c.capa,
    };
  }
  return null;
}

export default async function ComprarPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const produto = getProduto(id);
  const info = display(id);
  if (!produto || !info) notFound();

  const ehColecao = id === "colecao";
  const ehColecaoProf = id === COLECAO_PROF_ID;
  const badge = ehColecao
    ? "Coleção Completa"
    : ehColecaoProf
      ? "Combo Profissional"
      : "Protocolo PER4MANCE";
  const beneficios = ehColecao
    ? [
        `Acesso vitalício aos ${protocolos.length} protocolos`,
        "Todos os e-books de bônus inclusos",
        "Atualizações futuras sem custo",
      ]
    : ehColecaoProf
      ? [
          `Acesso vitalício aos ${BUNDLE_PROF.qtd} cursos para profissionais`,
          "Conteúdo para avaliar e prescrever com método",
          "Atualizações futuras sem custo",
        ]
      : [
          "Acesso vitalício a este protocolo",
          "Fichas das 3 fases (90 dias)",
          "E-books do protocolo inclusos",
        ];

  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden bg-[#0a0b0f] px-4 py-10">
      <div className="pointer-events-none absolute -left-40 top-0 h-96 w-96 rounded-full bg-per-azul/20 blur-[130px]" />
      <div
        className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full blur-[130px]"
        style={{ background: `${info.cor}22` }}
      />

      <div className="relative grid w-full max-w-4xl gap-6 lg:grid-cols-[1fr_minmax(360px,420px)]">
        {/* Resumo do produto */}
        <section className="flex flex-col justify-center">
          <Link href="/" className="mb-6 inline-flex items-center gap-2">
            <Image src="/logo.png" alt="PER4MANCE" width={44} height={44} className="h-10 w-auto object-contain" />
          </Link>

          <span
            className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider text-black"
            style={{ background: info.cor }}
          >
            {badge}
          </span>

          <h1 className="font-display text-4xl font-extrabold uppercase leading-[0.95] text-white md:text-5xl">
            {info.titulo}
          </h1>
          <p className="mt-3 max-w-md text-neutral-300">{info.sub}</p>

          <div className="mt-6 flex items-end gap-3">
            <span className="font-display text-5xl font-extrabold text-white">
              {formatBRL(produto.value)}
            </span>
            <span className="pb-1.5 text-sm text-neutral-400">ou {info.parcelas}</span>
          </div>

          <ul className="mt-6 space-y-2 text-sm text-neutral-300">
            {beneficios.map((t) => (
              <li key={t} className="flex items-start gap-2.5">
                <span
                  className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full text-black"
                  style={{ background: info.cor }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                {t}
              </li>
            ))}
          </ul>

          <p className="mt-6 text-xs text-neutral-500">🔒 Garantia de 7 dias. Compra 100% segura.</p>
        </section>

        {/* Card de checkout */}
        <section className="rounded-2xl border border-white/10 bg-[#11131a] p-6 shadow-2xl">
          <h2 className="font-display text-2xl font-extrabold uppercase text-white">Finalizar compra</h2>
          <p className="mt-1 mb-5 text-sm text-neutral-400">
            Preencha seus dados para gerar o pagamento.
          </p>
          <CheckoutGuest itemId={id} cor={info.cor} />
        </section>
      </div>
    </main>
  );
}
