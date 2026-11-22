// Escolhe o idioma pela localização só na página inicial (/).
// Países de língua portuguesa ficam em português; o resto vai para /en/.
// A escolha manual (cookie "lang", gravado pelo seletor PT/EN) sempre vence.
export const config = { matcher: '/' };

const PORTUGUESE = new Set(['BR', 'PT', 'AO', 'MZ', 'CV', 'GW', 'ST', 'TL']);

// Buscadores e geradores de prévia (Google, Bing, LinkedIn, WhatsApp...) nunca são redirecionados:
// eles precisam ver cada versão no próprio endereço para indexar as duas pelo hreflang.
const BOTS = /bot|crawl|spider|slurp|facebookexternalhit|embedly|whatsapp|telegram|discord|skype|preview|lighthouse|vercel-screenshot/i;

export default function middleware(request) {
  if (BOTS.test(request.headers.get('user-agent') || '')) {
    return new Response(null, { headers: { 'x-middleware-next': '1' } });
  }
  const cookie = request.headers.get('cookie') || '';
  const chosen = (cookie.match(/(?:^|;\s*)lang=(pt|en)\b/) || [])[1];
  const country = (request.headers.get('x-vercel-ip-country') || '').toUpperCase();

  const wantsEnglish = chosen ? chosen === 'en' : country !== '' && !PORTUGUESE.has(country);

  if (wantsEnglish) {
    const url = new URL('/en/', request.url);
    return new Response(null, {
      status: 307,
      headers: { Location: url.toString(), 'Cache-Control': 'private, no-store', Vary: 'Cookie' },
    });
  }
  // Segue para a página em português (mesmo efeito do next() do @vercel/functions, sem dependência).
  return new Response(null, { headers: { 'x-middleware-next': '1' } });
}
