import { NextResponse } from "next/server";
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const region = process.env.AWS_REGION || "us-east-1";
const ses = new SESClient({ region });

export async function POST(req: Request) {
  try {
    const { name, email, company, country, interest, message } = await req.json();

    const toAddress = process.env.SES_SALES_TO as string;
    const fromAddress = process.env.SES_FROM_EMAIL as string;

    const params = new SendEmailCommand({
      Source: fromAddress,
      Destination: { ToAddresses: [toAddress] },
      Message: {
        Subject: { Data: `New lead: ${interest || "General"} - ${company || "Unknown"}` },
        Body: {
          Html: {
            Data: `
              <h2>New Lead - MonoHR</h2>
              <p><b>Name:</b> ${name || "-"}</p>
              <p><b>Email:</b> ${email || "-"}</p>
              <p><b>Company:</b> ${company || "-"}</p>
              <p><b>Country:</b> ${country || "-"}</p>
              <p><b>Interest:</b> ${interest || "-"}</p>
              <p><b>Message:</b> ${message || "-"}</p>
            `,
          },
          Text: { Data: `Lead: ${name} <${email}> - ${company} - ${interest}` },
        },
      },
      ReplyToAddresses: email ? [email] : undefined,
    });

    await ses.send(params);
    return NextResponse.json({ ok: true });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}


