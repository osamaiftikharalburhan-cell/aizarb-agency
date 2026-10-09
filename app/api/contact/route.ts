import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { saveLead, type Lead } from '../../../lib/leads';

export const runtime = 'nodejs';

const MAX = { name: 200, email: 320, service: 100, details: 5000 };

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

async function sendLeadEmail({ name, email, service, details }: Lead): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO || 'osama.iftikhar.alburhan@gmail.com';
  if (!apiKey) throw new Error('RESEND_API_KEY is not set');

  const { error } = await new Resend(apiKey).emails.send({
    from: 'onboarding@resend.dev',
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
  if (error) throw new Error(`Resend API error: ${error.message}`);
}

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
  const lead: Lead = { name: field('name'), email: field('email'), service: field('service'), details: field('details') };

  if (!lead.name || !lead.email || !lead.service || !lead.details) {
    return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
  }
  if ((Object.keys(MAX) as (keyof typeof MAX)[]).some((k) => lead[k].length > MAX[k])) {
    return NextResponse.json({ error: 'Input too long' }, { status: 400 });
  }

  // Save and notify in parallel. Either one succeeding means the lead isn't lost,
  // so the visitor sees success; failures are logged for follow-up.
  const [db, mail] = await Promise.allSettled([saveLead(lead), sendLeadEmail(lead)]);

  if (db.status === 'rejected') console.error('Contact form: lead not saved to database', db.reason, lead);
  if (mail.status === 'rejected') console.error('Contact form: notification email failed', mail.reason, lead);

  if (db.status === 'rejected' && mail.status === 'rejected') {
    return NextResponse.json({ error: 'Could not send message. Please try again later.' }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
