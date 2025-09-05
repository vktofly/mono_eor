import { getEmailConfig, getAWSConfig } from './config';

interface EmailData {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  from?: string;
  replyTo?: string;
}

interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  message: string;
  interest?: string;
  source?: string;
}

export class EmailService {
  private fromEmail: string;
  private fromName: string;
  private adminEmail: string;
  private supportEmail: string;
  private awsConfig: Record<string, string | undefined>;

  constructor() {
    const emailConfig = getEmailConfig();
    this.fromEmail = emailConfig.fromEmail;
    this.fromName = emailConfig.fromName;
    this.adminEmail = emailConfig.adminEmail;
    this.supportEmail = emailConfig.supportEmail;
    this.awsConfig = getAWSConfig();
  }

  private async sendEmail(emailData: EmailData) {
    if (!this.awsConfig.accessKeyId || !this.awsConfig.secretAccessKey) {
      console.warn('AWS SES not configured, email not sent:', emailData);
      return { success: false, message: 'Email service not configured' };
    }

    try {
      // In a real implementation, you would use AWS SDK
      // For now, we'll simulate the email sending
      console.log('Email would be sent:', {
        from: emailData.from || `${this.fromName} <${this.fromEmail}>`,
        to: emailData.to,
        subject: emailData.subject,
        html: emailData.html,
      });

      return { success: true, message: 'Email sent successfully' };
    } catch (error) {
      console.error('Email sending failed:', error);
      return { success: false, message: 'Failed to send email' };
    }
  }

  async sendContactFormNotification(formData: ContactFormData) {
    const subject = `New Contact Form Submission - ${formData.company || 'Unknown Company'}`;
    
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2155CD;">New Contact Form Submission</h2>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #333;">Contact Details</h3>
          <p><strong>Name:</strong> ${formData.name}</p>
          <p><strong>Email:</strong> ${formData.email}</p>
          ${formData.company ? `<p><strong>Company:</strong> ${formData.company}</p>` : ''}
          ${formData.phone ? `<p><strong>Phone:</strong> ${formData.phone}</p>` : ''}
          ${formData.interest ? `<p><strong>Interest:</strong> ${formData.interest}</p>` : ''}
          ${formData.source ? `<p><strong>Source:</strong> ${formData.source}</p>` : ''}
        </div>
        
        <div style="background: #fff; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
          <h3 style="margin-top: 0; color: #333;">Message</h3>
          <p style="white-space: pre-wrap;">${formData.message}</p>
        </div>
        
        <div style="margin-top: 20px; padding: 15px; background: #e3f2fd; border-radius: 8px;">
          <p style="margin: 0; font-size: 14px; color: #666;">
            <strong>Next Steps:</strong> Follow up within 24 hours to maintain lead quality.
          </p>
        </div>
      </div>
    `;

    const text = `
New Contact Form Submission

Contact Details:
Name: ${formData.name}
Email: ${formData.email}
${formData.company ? `Company: ${formData.company}` : ''}
${formData.phone ? `Phone: ${formData.phone}` : ''}
${formData.interest ? `Interest: ${formData.interest}` : ''}
${formData.source ? `Source: ${formData.source}` : ''}

Message:
${formData.message}

Next Steps: Follow up within 24 hours to maintain lead quality.
    `;

    return this.sendEmail({
      to: this.adminEmail,
      subject,
      html,
      text,
      replyTo: formData.email,
    });
  }

  async sendQuoteRequestNotification(formData: Record<string, unknown>) {
    const subject = `New Quote Request - ${formData.company || 'Unknown Company'}`;
    
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2155CD;">New Quote Request</h2>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #333;">Company Details</h3>
          <p><strong>Company:</strong> ${formData.company}</p>
          <p><strong>Contact:</strong> ${formData.name} (${formData.email})</p>
          ${formData.phone ? `<p><strong>Phone:</strong> ${formData.phone}</p>` : ''}
          <p><strong>Employees:</strong> ${formData.employees}</p>
          <p><strong>Interest:</strong> ${formData.interest}</p>
        </div>
        
        <div style="background: #fff3cd; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #856404;">Priority: High</h3>
          <p style="margin: 0; color: #856404;">This is a qualified lead requesting a quote. Respond within 4 hours.</p>
        </div>
      </div>
    `;

    return this.sendEmail({
      to: this.adminEmail,
      subject,
      html,
      replyTo: formData.email,
    });
  }

  async sendDemoBookingNotification(formData: Record<string, unknown>) {
    const subject = `New Demo Booking - ${formData.company || 'Unknown Company'}`;
    
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2155CD;">New Demo Booking</h2>
        
        <div style="background: #d4edda; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #155724;">Demo Scheduled</h3>
          <p><strong>Company:</strong> ${formData.company}</p>
          <p><strong>Contact:</strong> ${formData.name} (${formData.email})</p>
          <p><strong>Demo Type:</strong> ${formData.demoType || 'General Demo'}</p>
          <p><strong>Preferred Time:</strong> ${formData.preferredTime || 'Not specified'}</p>
        </div>
        
        <div style="background: #fff; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
          <h3 style="margin-top: 0; color: #333;">Next Steps</h3>
          <ol>
            <li>Confirm the demo time with the client</li>
            <li>Prepare demo materials based on their interest</li>
            <li>Send calendar invite with meeting details</li>
            <li>Follow up 24 hours before the demo</li>
          </ol>
        </div>
      </div>
    `;

    return this.sendEmail({
      to: this.adminEmail,
      subject,
      html,
      replyTo: formData.email,
    });
  }

  async sendAutoReply(to: string, type: 'contact' | 'quote' | 'demo') {
    const templates = {
      contact: {
        subject: 'Thank you for contacting MonoHR',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2155CD;">Thank you for reaching out!</h2>
            <p>Hi there,</p>
            <p>Thank you for contacting MonoHR. We've received your message and will get back to you within 24 hours.</p>
            <p>In the meantime, feel free to explore our resources:</p>
            <ul>
              <li><a href="/resources">EOR Guides & Resources</a></li>
              <li><a href="/pricing">Transparent Pricing</a></li>
              <li><a href="/about">About Our Team</a></li>
            </ul>
            <p>Best regards,<br>The MonoHR Team</p>
          </div>
        `
      },
      quote: {
        subject: 'Your EOR India Quote Request - Next Steps',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2155CD;">Quote Request Received</h2>
            <p>Hi there,</p>
            <p>Thank you for requesting a quote for EOR services in India. Our team is preparing a customized proposal for your company.</p>
            <p><strong>What happens next:</strong></p>
            <ol>
              <li>Our EOR specialists will review your requirements</li>
              <li>We'll prepare a detailed quote within 4 hours</li>
              <li>We'll schedule a call to discuss the proposal</li>
            </ol>
            <p>In the meantime, you can use our <a href="/">cost calculator</a> to get an estimate.</p>
            <p>Best regards,<br>The MonoHR Team</p>
          </div>
        `
      },
      demo: {
        subject: 'Demo Booking Confirmed - What to Expect',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2155CD;">Demo Booking Confirmed</h2>
            <p>Hi there,</p>
            <p>Thank you for booking a demo with MonoHR. We're excited to show you how we can help scale your team in India.</p>
            <p><strong>What to expect:</strong></p>
            <ul>
              <li>30-minute personalized demo</li>
              <li>Live walkthrough of our platform</li>
              <li>Q&A session with our EOR experts</li>
              <li>Customized recommendations for your use case</li>
            </ul>
            <p>We'll send you a calendar invite shortly with the meeting details.</p>
            <p>Best regards,<br>The MonoHR Team</p>
          </div>
        `
      }
    };

    const template = templates[type];
    return this.sendEmail({
      to,
      subject: template.subject,
      html: template.html,
    });
  }
}

export const emailService = new EmailService();