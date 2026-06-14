import "server-only";

// Base URL conforme o ambiente. Chave de produção só fala com api.asaas.com.
const BASE =
  process.env.ASAAS_ENV === "production"
    ? "https://api.asaas.com/v3"
    : "https://api-sandbox.asaas.com/v3";

function headers() {
  return {
    "Content-Type": "application/json",
    "User-Agent": "PER4MANCE-app",
    access_token: process.env.ASAAS_API_KEY!,
  };
}

async function asaasFetch(path: string, init?: RequestInit) {
  const res = await fetch(`${BASE}${path}`, {
    ...init,
    headers: { ...headers(), ...(init?.headers ?? {}) },
    cache: "no-store",
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = data?.errors?.[0]?.description ?? res.statusText;
    throw new Error(`Asaas ${res.status}: ${msg}`);
  }
  return data;
}

/**
 * Acha o cliente Asaas do usuário (por externalReference = userId) ou cria.
 * Evita duplicar cliente a cada compra.
 */
export async function findOrCreateCustomer(p: {
  userId: string;
  name: string;
  email: string;
  cpfCnpj: string;
}): Promise<string> {
  const found = await asaasFetch(
    `/customers?externalReference=${encodeURIComponent(p.userId)}&limit=1`,
  );
  if (found?.data?.[0]?.id) return found.data[0].id as string;

  const created = await asaasFetch(`/customers`, {
    method: "POST",
    body: JSON.stringify({
      name: p.name,
      email: p.email,
      cpfCnpj: p.cpfCnpj.replace(/\D/g, ""),
      externalReference: p.userId,
    }),
  });
  return created.id as string;
}

/**
 * Cria a cobrança (billingType UNDEFINED = cliente escolhe Pix/cartão/boleto)
 * e devolve a invoiceUrl (checkout hospedado pela Asaas) + o id da cobrança.
 */
export async function createPayment(p: {
  customerId: string;
  value: number;
  description: string;
  externalReference: string;
  successUrl: string;
}): Promise<{ id: string; invoiceUrl: string }> {
  const due = new Date();
  due.setDate(due.getDate() + 3);
  const dueDate = due.toISOString().slice(0, 10);

  const payment = await asaasFetch(`/payments`, {
    method: "POST",
    body: JSON.stringify({
      customer: p.customerId,
      billingType: "UNDEFINED",
      value: p.value,
      dueDate,
      description: p.description,
      externalReference: p.externalReference,
      callback: { successUrl: p.successUrl, autoRedirect: true },
    }),
  });

  return { id: payment.id as string, invoiceUrl: payment.invoiceUrl as string };
}
