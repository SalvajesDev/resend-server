import { Resend } from 'resend';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const response = await resend.contacts.list({
      audienceId: process.env.RESEND_AUDIENCE_ID,
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return NextResponse.json({ error: 'Failed to fetch contacts' }, { status: 500 });
  }
}