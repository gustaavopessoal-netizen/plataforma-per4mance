// Quem pode entrar na Área Admin (o "bastidor"). Só estes e-mails.
// Para liberar outro gestor no futuro, é só adicionar o e-mail aqui.
const ADMIN_EMAILS = ["gustaavopessoal@gmail.com"];

export function isAdmin(email: string | null | undefined): boolean {
  if (!email) return false;
  return ADMIN_EMAILS.includes(email.toLowerCase().trim());
}
