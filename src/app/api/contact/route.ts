import { NextResponse } from "next/server";
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { z } from 'zod';
import { hubspotService } from '@/lib/hubspot';
import { emailService } from '@/lib/email';
import { trackEvent, AnalyticsEvents } from '@/lib/analytics';

const region = process.env.AWS_REGION || "us-east-1";
const ses = new SESClient({ region });

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
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Validate form data
    const validatedData = contactFormSchema.parse(body);
    
    // Track form submission
    trackEvent(AnalyticsEvents.FORM_SUBMITTED, {
      form_type: validatedData.formType,
      form_source: req.headers.get('referer') || 'unknown',
      user_company: validatedData.company,
      user_interest: validatedData.interest,
    });
    
    // Send to HubSpot CRM
    try {
      await hubspotService.logFormSubmission(validatedData, validatedData.formType);
    } catch (hubspotError) {
      console.error('HubSpot integration error:', hubspotError);
      // Continue processing even if HubSpot fails
    }
    
    // Send email notifications using our enhanced email service
    try {
      // Send notification to admin
      await emailService.sendContactFormNotification(validatedData);
      
      // Send confirmation to user
      await emailService.sendAutoReply(validatedData.email, 'contact');
    } catch (emailError) {
      console.error('Email service error:', emailError);
      
      // Fallback to original SES method
      const toAddress = process.env.SES_SALES_TO as string;
      const fromAddress = process.env.SES_FROM_EMAIL as string;

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
    }
    
    // Log successful submission
    console.log('Contact form submission processed:', {
      name: validatedData.name,
      email: validatedData.email,
      company: validatedData.company,
      formType: validatedData.formType,
    });
    
    return NextResponse.json({ 
      success: true, 
      message: 'Thank you for your message. We\'ll get back to you within 24 hours!' 
    });
    
  } catch (error) {
    console.error('Contact form error:', error);
    
    // Track form error
    trackEvent(AnalyticsEvents.FORM_ERROR, {
      error_type: 'validation_error',
      error_message: error instanceof Error ? error.message : 'Unknown error',
    });
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Please check your form data and try again.',
          errors: error.errors 
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


