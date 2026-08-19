// Verrouillage temporaire du site : tant que la BASCULE ci-dessous n'est pas
// desactivee, tous les visiteurs voient /maintenance.html a la place du
// vrai contenu. Le deverrouillage se fait UNIQUEMENT depuis cette page,
// en tapant un code au clavier (cf. maintenance.html) — aucun lien, aucune
// URL secrete quelque part.
//
// Pour REMETTRE le site en ligne pour tout le monde : passe LOCKED a false
// ci-dessous et redeploie (ou supprime ce fichier).

export const config = { matcher: '/:path*' };

const LOCKED = true;
const SECRET = '31l4xvikquvhzqsp';
const COOKIE_NAME = 'pp_access';

export default function middleware(request) {
  if (!LOCKED) return;

  const url = new URL(request.url);

  // Laisse passer la page de maintenance elle-meme et les fichiers
  // necessaires a son affichage (logo, etc.).
  if (
    url.pathname === '/maintenance.html' ||
    url.pathname.startsWith('/assets/')
  ) {
    return;
  }

  const cookieHeader = request.headers.get('cookie') || '';
  const hasAccess = cookieHeader
    .split(';')
    .some((c) => c.trim() === `${COOKIE_NAME}=${SECRET}`);

  if (hasAccess) return;

  return fetch(new URL('/maintenance.html', url.origin));
}
