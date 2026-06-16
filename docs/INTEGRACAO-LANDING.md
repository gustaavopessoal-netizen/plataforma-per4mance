# Integração Landing "De Volta ao Jogo" → Plataforma (sem Hotmart)

Fluxo novo: **Instagram → landing → /comprar → paga (Asaas) → conta criada
automaticamente → e-mail "crie sua senha" → entra na plataforma.**
A Hotmart foi removida da landing.

## O que mudou no código (já feito)

- `src/app/comprar/[id]/page.tsx` — **página de checkout pública** (sem login). Ex.:
  `/comprar/joelho`, `/comprar/colecao`. Mostra produto + preço + formulário.
- `src/components/CheckoutGuest.tsx` — formulário (nome + e-mail + CPF). Se já
  estiver logado, usa o e-mail da sessão.
- `src/app/api/checkout/route.ts` — passou a aceitar **visitante**: cria/reaproveita
  a conta pelo e-mail (`ensureUserByEmail`) e gera a cobrança Asaas. Continua
  funcionando para usuário logado.
- `src/lib/conta.ts` — `ensureUserByEmail` (cria conta sem senha, marca
  `precisa_senha`) + `enviarEmailDefinirSenha` (recovery via SMTP do Supabase).
- `src/app/api/webhooks/asaas/route.ts` — ao **confirmar o pagamento**, além de
  liberar o curso, dispara o e-mail de criação de senha (só uma vez por conta).
- `src/app/definir-senha/page.tsx` — o cliente **cria a própria senha** pelo link.
- `src/app/bem-vindo/page.tsx` — retorno pós-pagamento (successUrl da Asaas).
- Landing (`.../De volta ao jogo/index.html` + `curso.html`) — botões agora
  apontam para `https://plataforma-per4mance.vercel.app/comprar/<id>`.

**Não precisa de SQL novo** — reusa a tabela `compras` e `user_metadata`.

## Checklist de GO-LIVE (precisa de você)

### 1. Plataforma (Vercel)
- [ ] Variáveis de ambiente (Production): `NEXT_PUBLIC_SUPABASE_URL`,
  `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `ASAAS_API_KEY`,
  `ASAAS_ENV` (`sandbox` p/ testar, `production` p/ valer), `ASAAS_WEBHOOK_TOKEN`,
  `APP_URL=https://plataforma-per4mance.vercel.app`.
- [ ] Deploy: `npm run build` → `cd dist`? (não — é Next) → `npx vercel --prod`
  na raiz do projeto, ou push se o Git estiver ligado.
- [ ] Confirmar que `supabase/schema.sql` e `supabase/schema-fase3.sql` já rodaram.

### 2. Asaas (painel)
- [ ] Webhook URL: `https://plataforma-per4mance.vercel.app/api/webhooks/asaas`
- [ ] Token do webhook = mesmo valor de `ASAAS_WEBHOOK_TOKEN` (header `asaas-access-token`).
- [ ] Eventos: `PAYMENT_CONFIRMED`, `PAYMENT_RECEIVED` (+ refunds para revogar).

### 3. Supabase Auth (e-mails)
- [ ] **URL Configuration** → Redirect URLs: adicionar
  `https://plataforma-per4mance.vercel.app/definir-senha` e `.../bem-vindo`.
- [ ] **Email Templates** → "Reset password": reescrever para
  "Bem-vindo à PER4MANCE! Crie sua senha de acesso".
- [ ] **SMTP**: configurar SMTP próprio (Resend/SendGrid/Brevo). ⚠️ O e-mail
  padrão do Supabase é limitado (~poucos por hora) e cai em spam — **obrigatório
  para vender de verdade**.

### 4. Landing (deploy)
- [ ] Publicar a pasta `De volta ao jogo` atualizada (Hostinger/onde estiver).
- [ ] Se a plataforma ganhar domínio próprio, trocar a base
  `https://plataforma-per4mance.vercel.app` nos 2 arquivos (ou rodar de novo o
  `_religar_plataforma.py` com a nova base).

### 5. Teste ponta a ponta (em SANDBOX antes de produção)
1. Landing → "Resolver agora" (Joelho) → cai em `/comprar/joelho`.
2. Preenche nome/e-mail/CPF → "Ir para o pagamento" → checkout Asaas (sandbox).
3. Paga (Pix sandbox) → volta para `/bem-vindo`.
4. Webhook confirma → chega o e-mail "crie sua senha".
5. Clica → `/definir-senha` → cria senha → entra logado → o curso aparece liberado.

## Observações
- **Segurança/abuso:** o checkout cria a conta no clique, mas o e-mail de senha
  só sai **quando o pagamento confirma**. Contas sem pagamento ficam vazias.
- **Boleto/Pix lento:** o acesso só libera no webhook; o card `/bem-vindo` avisa
  que o e-mail chega quando confirmar.
- **Cliente que já tem conta** comprando outro curso: o acesso é só somado; ele
  usa a senha que já tem (ou "esqueci a senha" no /login).
