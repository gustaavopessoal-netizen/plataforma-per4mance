export function Footer() {
  return (
    <footer className="mt-12 border-t border-white/10 bg-[#070809] px-4 py-12 md:px-12">
      <div className="mx-auto max-w-[1500px]">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="PER4MANCE" className="h-9 w-auto object-contain" />
            <p className="mt-4 text-sm leading-relaxed text-neutral-400">
              PER4MANCE by Gustavo Vieira — desenvolvendo atletas, transformando o ensino.
              Protocolos de recuperação esportiva baseados em fisioterapia aplicada e mais de
              10 anos de alto rendimento.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 text-sm sm:grid-cols-3">
            <div>
              <h4 className="mb-3 font-display text-base font-bold uppercase text-neutral-200">Plataforma</h4>
              <ul className="space-y-2 text-neutral-400">
                <li>Início</li>
                <li>Meus Cursos</li>
                <li>Protocolos</li>
                <li>Coleção Completa</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-3 font-display text-base font-bold uppercase text-neutral-200">Suporte</h4>
              <ul className="space-y-2 text-neutral-400">
                <li>Central de Ajuda</li>
                <li>Contato</li>
                <li>WhatsApp</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-3 font-display text-base font-bold uppercase text-neutral-200">Instrutor</h4>
              <ul className="space-y-2 text-neutral-400">
                <li>Gustavo Vieira</li>
                <li>Pós-grad. UFMG</li>
                <li>CBF Academy</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-xs text-neutral-500">
          © {new Date().getFullYear()} PER4MANCE. Todos os direitos reservados. Este conteúdo é
          educativo e não substitui avaliação médica presencial.
        </div>
      </div>
    </footer>
  );
}
