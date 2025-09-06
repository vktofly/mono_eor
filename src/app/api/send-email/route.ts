import { NextRequest, NextResponse } from 'next/server';
import { getEmailConfig, getAWSConfig } from '@/lib/config';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

interface EmailRequest {
  to: string[];
  from: string;
  subject: string;
  text?: string;
  html?: string;
  replyTo?: string;
  cc?: string[];
  bcc?: string[];
}

export async function POST(request: NextRequest) {
  try {
    const emailData: EmailRequest = await request.json();
    
    // Validate required fields
    if (!emailData.to || !emailData.from || !emailData.subject) {
      return NextResponse.json(
        { error: 'Missing required fields: to, from, subject' },
        { status: 400 }
      );
    }

    const emailConfig = getEmailConfig();
    const awsConfig = getAWSConfig();

           // Check if AWS credentials are configured
           if (!awsConfig.accessKeyId || !awsConfig.secretAccessKey) {
             console.warn('AWS SES credentials not configured, using simulation mode');

             // Simulate email sending for development
             console.log('Simulating email send:', {
               to: emailData.to,
               from: emailData.from,
               subject: emailData.subject,
               replyTo: emailData.replyTo,
               cc: emailData.cc,
               bcc: emailData.bcc,
             });

             const messageId = `sim-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

             return NextResponse.json({
               success: true,
               messageId,
               message: 'Email simulated successfully (AWS SES not configured)',
               simulated: true,
             });
           }

           // Check if we're in development mode and should use simulation
           const isDevelopment = process.env.NODE_ENV === 'development';
           const shouldSimulate = isDevelopment && (
             emailData.from.includes('noreply@monohr.com') || 
             emailData.from.includes('contact@monohr.com') ||
             emailData.to.some(email => email.includes('@example.com'))
           );

           if (shouldSimulate) {
             console.log('Development mode: Simulating email send for unverified addresses');
             
             const messageId = `sim-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

             return NextResponse.json({
               success: true,
               messageId,
               message: 'Email simulated successfully (development mode - unverified addresses)',
               simulated: true,
             });
           }

    // Initialize AWS SES client
    const sesClient = new SESClient({
      region: awsConfig.region,
      credentials: {
        accessKeyId: awsConfig.accessKeyId,
        secretAccessKey: awsConfig.secretAccessKey,
      },
    });

    // Prepare email parameters
    const emailParams = {
      Source: emailData.from,
      Destination: {
        ToAddresses: emailData.to,
        CcAddresses: emailData.cc || [],
        BccAddresses: emailData.bcc || [],
      },
      Message: {
        Subject: {
          Data: emailData.subject,
          Charset: 'UTF-8',
        },
        Body: {
          ...(emailData.html && {
            Html: {
              Data: emailData.html,
              Charset: 'UTF-8',
            },
          }),
          ...(emailData.text && {
            Text: {
              Data: emailData.text,
              Charset: 'UTF-8',
            },
          }),
        },
      },
      ...(emailData.replyTo && {
        ReplyToAddresses: [emailData.replyTo],
      }),
    };

    // Send email using AWS SES
    const command = new SendEmailCommand(emailParams);
    const result = await sesClient.send(command);

    console.log('Email sent successfully:', {
      messageId: result.MessageId,
      to: emailData.to,
      subject: emailData.subject,
    });

    return NextResponse.json({
      success: true,
      messageId: result.MessageId,
      message: 'Email sent successfully via AWS SES',
    });

         } catch (error) {
           console.error('Error sending email:', error);
           
           // Handle specific AWS SES errors
           if (error instanceof Error) {
             if (error.message.includes('Email address is not verified')) {
               return NextResponse.json(
                 {
                   error: 'Email address not verified',
                   message: 'The email address needs to be verified in AWS SES. In development mode, emails are simulated.',
                   details: error.message,
                   simulated: true
                 },
                 { status: 400 }
               );
             }
             
             if (error.message.includes('MessageRejected')) {
               return NextResponse.json(
                 {
                   error: 'Message rejected by AWS SES',
                   message: 'The email was rejected by AWS SES. Check your email configuration.',
                   details: error.message,
                   simulated: true
                 },
                 { status: 400 }
               );
             }
           }
           
           return NextResponse.json(
             {
               error: 'Failed to send email',
               details: error instanceof Error ? error.message : 'Unknown error'
             },
             { status: 500 }
           );
         }
}

// Handle GET requests for health check
export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    service: 'Email Service',
    timestamp: new Date().toISOString(),
  });
}
