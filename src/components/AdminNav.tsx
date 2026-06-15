import Link from "next/link";

const ITENS = [
  { href: "/admin", label: "Painel", key: "painel" },
  { href: "/admin/vendas", label: "Vendas", key: "vendas" },
  { href: "/admin/alunos", label: "Alunos", key: "alunos" },
];

export function AdminNav({ atual }: { atual: string }) {
  return (
    <nav className="mb-8 flex items-center gap-1 border-b border-white/10">
      {ITENS.map((i) => (
        <Link
          key={i.key}
          href={i.href}
          className={`px-4 py-2.5 text-sm font-semibold transition-colors ${
            atual === i.key
              ? "border-b-2 border-per-azul text-white"
              : "text-neutral-400 hover:text-white"
          }`}
        >
          {i.label}
        </Link>
      ))}
      <Link href="/" className="ml-auto px-2 text-sm text-neutral-500 transition-colors hover:text-white">
        Ver site →
      </Link>
    </nav>
  );
}
