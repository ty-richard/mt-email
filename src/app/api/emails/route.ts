import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import MotortrendNewsletterEmailTemplate from '../../../emails/index';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    const { name, email } = await request.json();

    try {
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'Hello Motortrend User!',
            react: MotortrendNewsletterEmailTemplate({
                name
            })
        });
    
        return NextResponse.json({
            status: 'ok'
        })
    } catch(e: unknown) {
        if (e instanceof Error) {
          console.log(`Failed to send email: ${e.message}`);
        }
        return NextResponse.json({
          error: 'Internal server error.'
        }, {
          status: 500
        })
    }
}