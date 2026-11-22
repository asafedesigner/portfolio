// Escolhe o idioma pela localização só na página inicial (/).
// Países de língua portuguesa ficam em português; o resto vai para /en/.
// A escolha manual (cookie "lang", gravado pelo seletor PT/EN) sempre vence.
export const config = { matcher: '/' };

const PORTUGUESE = new Set(['BR', 'PT', 'AO', 'MZ', 'CV', 'GW', 'ST', 'TL']);

export default function middleware(request) {
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
