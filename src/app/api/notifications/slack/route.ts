import { NextResponse } from "next/server";

interface SlackMessage {
  text: string;
  blocks?: Array<{
    type: string;
    text?: {
      type: string;
      text: string;
    };
    fields?: Array<{
      type: string;
      text: string;
    }>;
    elements?: Array<{
      type: string;
      text?: {
        type: string;
        text: string;
      };
      url?: string;
      style?: string;
    }>;
  }>;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, company, phone, message, interest, country, employees } = body;

    const webhookUrl = process.env.SLACK_WEBHOOK_URL;
    
    if (!webhookUrl) {
      console.error('SLACK_WEBHOOK_URL environment variable is not set');
      return NextResponse.json(
        { success: false, message: 'Slack webhook URL not configured' },
        { status: 500 }
      );
    }

    const slackMessage = {
      text: `🚨 New Contact Form Submission - ${company || 'Unknown Company'}`,
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*🚨 New Client Registration - Needs Attention!*\n\n*Company:* ${company || 'Not provided'}\n*Contact Person:* ${name}\n*Email:* ${email}\n*Phone:* ${phone || 'Not provided'}\n*Country:* ${country || 'Not provided'}\n*Company Size:* ${employees || 'Not provided'}\n*Interest:* ${interest || 'General'}\n\n*Message:*\n${message}\n\n⏰ Submitted at: ${new Date().toLocaleString('en-US', { 
              timeZone: 'Asia/Kolkata',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit'
            })} IST`
          }
        }
      ]
    };

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(slackMessage),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Slack webhook failed:', response.status, errorText);
      return NextResponse.json(
        { success: false, message: 'Failed to send Slack notification' },
        { status: 500 }
      );
    }

    console.log('Slack notification sent successfully');
    return NextResponse.json({ success: true, message: 'Slack notification sent' });

  } catch (error) {
    console.error('Slack notification error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
