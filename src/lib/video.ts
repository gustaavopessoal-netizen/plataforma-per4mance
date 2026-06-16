// Converte um link de vídeo no formato de EMBED (iframe).
// Aceita YouTube (watch?v=, youtu.be, shorts, /embed) e deixa passar direto
// links já embedáveis (Bunny, Panda, Vimeo player, etc.).
export function toEmbedUrl(url: string): string {
  if (!url) return url;
  const u = url.trim();

  // youtu.be/ID
  const curto = u.match(/youtu\.be\/([\w-]{6,})/);
  if (curto) return `https://www.youtube.com/embed/${curto[1]}`;

  // youtube.com/shorts/ID
  const shorts = u.match(/youtube\.com\/shorts\/([\w-]{6,})/);
  if (shorts) return `https://www.youtube.com/embed/${shorts[1]}`;

  // youtube.com/watch?v=ID
  if (u.includes("youtube.com")) {
    const v = u.match(/[?&]v=([\w-]{6,})/);
    if (v) return `https://www.youtube.com/embed/${v[1]}`;
  }

  // já é embed do YouTube ou outro player → usa como está
  return u;
}
