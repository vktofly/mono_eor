import { NextResponse } from "next/server";
import { z } from 'zod';
import { trackEvent, AnalyticsEvents } from '@/lib/analytics';

// Form validation schema
const pricingFormSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  company: z.string().min(2, 'Company name must be at least 2 characters'),
  employees: z.string().min(1, 'Please select number of employees'),
  interest: z.enum(["contractor", "professional", "enterprise", "demo", "quote"]),
});

export async function POST(req: Request) {
  const startTime = Date.now();
  
  try {
    const body = await req.json();
    
    // Validate form data
    const validatedData = pricingFormSchema.parse(body);
    
    // Log form submission attempt
    console.log('Pricing form submission received:', {
      timestamp: new Date().toISOString(),
      ip: req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown',
      userAgent: req.headers.get('user-agent') || 'unknown',
      formType: 'pricing_quote',
    });
    
    // Track form submission
    trackEvent(AnalyticsEvents.FORM_SUBMIT, {
      form_type: 'pricing_quote',
      form_source: req.headers.get('referer') || 'unknown',
      user_company: validatedData.company,
      user_interest: validatedData.interest,
    });
    
    // Send Slack notification
    try {
      const slackResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/notifications/slack`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: validatedData.company || 'Pricing Form Submission',
          email: validatedData.email,
          company: validatedData.company,
          phone: 'Not provided',
          message: `Pricing inquiry for ${validatedData.interest} plan with ${validatedData.employees} employees`,
          interest: validatedData.interest,
          country: 'Not provided',
          employees: validatedData.employees,
        }),
      });

      if (slackResponse.ok) {
        console.log('Pricing form Slack notification sent successfully');
      } else {
        console.error('Pricing form Slack notification failed:', slackResponse.status);
      }
    } catch (slackError) {
      console.error('Pricing form Slack notification error:', slackError);
      // Continue processing even if Slack notification fails
    }
    
    // Log successful submission
    const processingTime = Date.now() - startTime;
    console.log('Pricing form submission processed successfully:', {
      email: validatedData.email,
      company: validatedData.company,
      interest: validatedData.interest,
      employees: validatedData.employees,
      processingTimeMs: processingTime,
      timestamp: new Date().toISOString(),
    });
    
    return NextResponse.json({ 
      success: true, 
      message: 'Thank you for your interest! We\'ll be in touch within 24 hours with your personalized quote.',
      processingTime: processingTime,
    });
    
  } catch (error) {
    const processingTime = Date.now() - startTime;
    console.error('Pricing form error:', {
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
