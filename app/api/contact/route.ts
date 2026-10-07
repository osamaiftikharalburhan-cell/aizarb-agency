import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export const runtime = 'nodejs';

const MAX = { name: 200, email: 320, service: 100, details: 5000 };

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  // Honeypot check for bots
  if (body.website) return NextResponse.json({ ok: true });

  const field = (k: keyof typeof MAX) => (typeof body[k] === 'string' ? (body[k] as string).trim() : '');
  const name = field('name');
  const email = field('email');
  const service = field('service');
  const details = field('details');

  if (!name || !email || !service || !details) {
    return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
  }
  if ((Object.keys(MAX) as (keyof typeof MAX)[]).some((k) => field(k).length > MAX[k])) {
    return NextResponse.json({ error: 'Input too long' }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO || 'osama.iftikhar.alburhan@gmail.com';

  if (!apiKey) {
    console.error('Contact form: RESEND_API_KEY is not set');
    return NextResponse.json({ error: 'Email service is not configured' }, { status: 500 });
  }

  const resend = new Resend(apiKey);

  try {
    const { data, error } = await resend.emails.send({
      from: 'AIZARB Website <onboarding@resend.dev>',
      to: [to],
      replyTo: email,
      subject: `New enquiry: ${service} — ${name}`,
      text: `Full Name: ${name}\nBusiness Email: ${email}\nService Type: ${service}\n\nProject Details:\n${details}`,
      html: `
        <h2 style="font-family:sans-serif">New enquiry from aizarb.com</h2>
        <p style="font-family:sans-serif">
          <b>Full Name:</b> ${escapeHtml(name)}<br>
          <b>Business Email:</b> ${escapeHtml(email)}<br>
          <b>Service Type:</b> ${escapeHtml(service)}
        </p>
        <p style="font-family:sans-serif">
          <b>Project Details:</b><br>${escapeHtml(details).replace(/\n/g, '<br>')}
        </p>
      `,
    });

    if (error) {
      console.error('Resend API error:', error);
      return NextResponse.json({ error: 'Could not send message' }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Contact form: send failed', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}