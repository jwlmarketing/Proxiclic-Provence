// Verifie le code secret tape sur /maintenance.html. Le code lui-meme et le
// jeton de cookie ne sont JAMAIS ecrits ici en dur (depot public) : ils
// vivent dans les variables d'environnement Vercel (Project Settings >
// Environment Variables) :
//   PP_ACCESS_SECRET   -> jeton aleatoire pour le cookie de deverrouillage
//   PP_UNLOCK_CODE     -> le code attendu, en JSON, ex: ["ArrowUp","p","r"]

export const config = { runtime: 'edge' };

const COOKIE_NAME = 'pp_access';

export default async function handler(request) {
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  const secret = process.env.PP_ACCESS_SECRET;
  const rawCode = process.env.PP_UNLOCK_CODE;
  if (!secret || !rawCode) {
    return new Response(JSON.stringify({ ok: false }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  let expected;
  try {
    expected = JSON.parse(rawCode);
  } catch {
    return new Response(JSON.stringify({ ok: false }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return new Response('Bad request', { status: 400 });
  }

  // Le client envoie une fenetre glissante des dernieres touches tapees (plus
  // longue que le code) : on compare seulement la fin de cette fenetre.
  const seq = Array.isArray(body.seq) ? body.seq : [];
  const tail = seq.slice(seq.length - (Array.isArray(expected) ? expected.length : 0));
  const match =
    Array.isArray(expected) &&
    expected.length > 0 &&
    tail.length === expected.length &&
    tail.every((k, i) => k === expected[i]);

  if (!match) {
    return new Response(JSON.stringify({ ok: false }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Set-Cookie': `${COOKIE_NAME}=${secret}; Path=/; Max-Age=${60 * 60 * 24 * 30}; SameSite=Lax`,
    },
  });
}
