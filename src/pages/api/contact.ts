import type { APIRoute } from 'astro';
// TODO: integrate real email backend (SendGrid, Resend, SMTP). Currently returns ok stub.
export const POST: APIRoute = async ({ request }) => {
  try {
    const data: any = await request.json();
    if (!data?.name || !data?.email || !data?.message) {
      return new Response(JSON.stringify({ ok: false, error: 'missing_fields' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }
    return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch {
    return new Response(JSON.stringify({ ok: false, error: 'invalid_json' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }
};
