// app/api/pdf-export/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email, city, hardness, consent } = await request.json();

    if (!consent || !email) {
      return NextResponse.json({ error: 'Consent and email are required.' }, { status: 400 });
    }

    // NOTE: In a production environment without DB, you'd send this email to a 
    // lightweight service like Resend, MailerLite, or a Google Sheet via webhook.
    console.log(`Lead Captured: ${email} for ${city}`);

    // Generate lightweight content block
    const pdfContent = `
      AQUASCALE EUROPE: OFFICIAL WATER DOSSIER
      ----------------------------------------
      City: ${city}
      Hardness Level: ${hardness} mg/L
      Classification: ${hardness > 120 ? 'Hard' : 'Soft'} Water
      
      PROPERTY IMPACT SUMMARY:
      At ${hardness} mg/L, your appliances are ${hardness > 120 ? 'at risk of scaling' : 'safe from severe scaling'}.
      
      DISCLAIMER: This is an automated algorithmic report. 
      Generated for: ${email}
    `;

    // Return as a downloadable text/PDF stream 
    return new Response(pdfContent, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf', // Or text/plain for raw test
        'Content-Disposition': `attachment; filename="Water-Report-${city}.pdf"`,
      },
    });

  } catch (error) {
    return NextResponse.json({ error: 'Failed to generate document' }, { status: 500 });
  }
}