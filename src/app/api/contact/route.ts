import { NextResponse } from "next/server";
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { z } from 'zod';
import { hubspotService } from '@/lib/hubspot';
import { emailService } from '@/lib/email';
import { trackEvent, AnalyticsEvents } from '@/lib/analytics';

// Initialize SES client with proper error handling
let ses: SESClient | null = null;
try {
  const region = process.env.AWS_REGION || "us-east-1";
  ses = new SESClient({ region });
} catch (error) {
  console.warn('Failed to initialize SES client:', error);
}

// Form validation schema
const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  company: z.string().optional(),
  country: z.string().optional(),
  phone: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  interest: z.string().optional(),
  source: z.string().optional(),
  formType: z.string().default('contact'),
  employees: z.string().optional(),
});

export async function POST(req: Request) {
  const startTime = Date.now();
  
  try {
    const body = await req.json();
    
    // Validate form data
    const validatedData = contactFormSchema.parse(body);
    
    // Log form submission attempt
    console.log('Contact form submission received:', {
      timestamp: new Date().toISOString(),
      ip: req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown',
      userAgent: req.headers.get('user-agent') || 'unknown',
      formType: validatedData.formType,
    });
    
    // Track form submission
    trackEvent(AnalyticsEvents.FORM_SUBMIT, {
      form_type: validatedData.formType,
      form_source: req.headers.get('referer') || 'unknown',
      user_company: validatedData.company,
      user_interest: validatedData.interest,
    });
    
    // Send to HubSpot CRM
    try {
      await hubspotService.createContact({
        email: validatedData.email,
        firstname: validatedData.name?.split(' ')[0],
        lastname: validatedData.name?.split(' ').slice(1).join(' '),
        company: validatedData.company,
        phone: validatedData.phone,
        lead_source: 'website',
        notes: validatedData.message,
        custom_fields: {
          interest: validatedData.interest,
          country: validatedData.country,
          form_type: validatedData.formType,
        },
      });
    } catch (hubspotError) {
      console.error('HubSpot integration error:', hubspotError);
      // Continue processing even if HubSpot fails
    }
    
    // Send Slack notification
    try {
      const slackResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/notifications/slack`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: validatedData.name,
          email: validatedData.email,
          company: validatedData.company,
          phone: validatedData.phone,
          message: validatedData.message,
          interest: validatedData.interest,
          country: validatedData.country,
          employees: validatedData.employees,
        }),
      });

      if (slackResponse.ok) {
        console.log('Slack notification sent successfully');
      } else {
        console.error('Slack notification failed:', slackResponse.status);
      }
    } catch (slackError) {
      console.error('Slack notification error:', slackError);
      // Continue processing even if Slack notification fails
    }

    // Send email notifications using our enhanced email service
    try {
      // Send notification to admin
      await emailService.sendContactFormEmail({
        name: validatedData.name,
        email: validatedData.email,
        company: validatedData.company,
        phone: validatedData.phone,
        message: validatedData.message,
        subject: validatedData.interest || 'General Inquiry',
      });
      
      // Send confirmation to user
      await emailService.sendWelcomeEmail(validatedData.email, validatedData.name);
    } catch (emailError) {
      console.error('Email service error:', emailError);
      
      // Fallback to original SES method with proper validation
      try {
        const toAddress = process.env.SES_SALES_TO;
        const fromAddress = process.env.SES_FROM_EMAIL;

        if (!toAddress || !fromAddress) {
          console.error('Missing required email environment variables for fallback');
          throw new Error('Email configuration incomplete');
        }

        if (!ses) {
          console.error('SES client not initialized');
          throw new Error('Email service unavailable');
        }

        const params = new SendEmailCommand({
          Source: fromAddress,
          Destination: { ToAddresses: [toAddress] },
          Message: {
            Subject: { Data: `New lead: ${validatedData.interest || "General"} - ${validatedData.company || "Unknown"}` },
            Body: {
              Html: {
                Data: `
                  <h2>New Lead - MonoHR</h2>
                  <p><b>Name:</b> ${validatedData.name || "-"}</p>
                  <p><b>Email:</b> ${validatedData.email || "-"}</p>
                  <p><b>Company:</b> ${validatedData.company || "-"}</p>
                  <p><b>Country:</b> ${validatedData.country || "-"}</p>
                  <p><b>Interest:</b> ${validatedData.interest || "-"}</p>
                  <p><b>Message:</b> ${validatedData.message || "-"}</p>
                `,
              },
              Text: { Data: `Lead: ${validatedData.name} <${validatedData.email}> - ${validatedData.company} - ${validatedData.interest}` },
            },
          },
          ReplyToAddresses: validatedData.email ? [validatedData.email] : undefined,
        });

        await ses.send(params);
        console.log('Fallback email sent successfully via SES');
      } catch (fallbackError) {
        console.error('Fallback email sending failed:', fallbackError);
        // Continue processing even if all email methods fail
      }
    }
    
    // Log successful submission
    const processingTime = Date.now() - startTime;
    console.log('Contact form submission processed successfully:', {
      name: validatedData.name,
      email: validatedData.email,
      company: validatedData.company,
      formType: validatedData.formType,
      processingTimeMs: processingTime,
      timestamp: new Date().toISOString(),
    });
    
    return NextResponse.json({ 
      success: true, 
      message: 'Thank you for your message. We\'ll get back to you within 30 minutes!',
      processingTime: processingTime,
    });
    
  } catch (error) {
    const processingTime = Date.now() - startTime;
    console.error('Contact form error:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      processingTimeMs: processingTime,
      timestamp: new Date().toISOString(),
    });
    
    // Track form error
    trackEvent(AnalyticsEvents.ERROR, {
      error_type: error instanceof z.ZodError ? 'validation_error' : 'server_error',
      error_message: error instanceof Error ? error.message : 'Unknown error',
      processing_time: processingTime,
    });
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Please check your form data and try again.',
          errors: error.issues 
        },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { success: false, message: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}


