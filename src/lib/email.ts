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
  private awsConfig: any;

  constructor() {
    const emailConfig = getEmailConfig();
    const awsConfig = getAWSConfig();
    
    this.fromEmail = emailConfig.fromEmail;
    this.fromName = emailConfig.fromName;
    this.adminEmail = emailConfig.adminEmail;
    this.supportEmail = emailConfig.supportEmail;
    this.awsConfig = awsConfig;
  }

  private async sendEmail(emailData: EmailData) {
    if (!this.awsConfig.accessKeyId || !this.awsConfig.secretAccessKey) {
      throw new Error('AWS SES credentials not configured');
    }

    // For now, we'll use a simple fetch approach
    // In production, you might want to use the AWS SDK
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...emailData,
        from: emailData.from || `${this.fromName} <${this.fromEmail}>`,
        awsConfig: this.awsConfig,
      }),
    });

    if (!response.ok) {
      throw new Error(`Email sending failed: ${response.statusText}`);
    }

    return response.json();
  }

  async sendContactFormNotification(formData: ContactFormData) {
    const subject = `New Contact Form Submission - ${formData.company || 'Unknown Company'}`;
    
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2155CD;">New Contact Form Submission</h2>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #333; margin-top: 0;">Contact Details</h3>
          <p><strong>Name:</strong> ${formData.name}</p>
          <p><strong>Email:</strong> ${formData.email}</p>
          ${formData.company ? `<p><strong>Company:</strong> ${formData.company}</p>` : ''}
          ${formData.phone ? `<p><strong>Phone:</strong> ${formData.phone}</p>` : ''}
          ${formData.interest ? `<p><strong>Interest:</strong> ${formData.interest}</p>` : ''}
          ${formData.source ? `<p><strong>Source:</strong> ${formData.source}</p>` : ''}
        </div>
        
        <div style="background: #fff; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
          <h3 style="color: #333; margin-top: 0;">Message</h3>
          <p style="white-space: pre-wrap;">${formData.message}</p>
        </div>
        
        <div style="margin-top: 20px; padding: 15px; background: #e3f2fd; border-radius: 8px;">
          <p style="margin: 0; color: #1976d2;">
            <strong>Next Steps:</strong> Please respond to this inquiry within 24 hours to maintain our service standards.
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

Next Steps: Please respond to this inquiry within 24 hours.
    `;

    return this.sendEmail({
      to: this.adminEmail,
      subject,
      html,
      text,
      replyTo: formData.email,
    });
  }

  async sendQuoteRequestNotification(formData: any) {
    const subject = `New Quote Request - ${formData.company || 'Unknown Company'}`;
    
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2155CD;">New Quote Request</h2>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #333; margin-top: 0;">Company Details</h3>
          <p><strong>Company:</strong> ${formData.company}</p>
          <p><strong>Contact:</strong> ${formData.name} (${formData.email})</p>
          ${formData.phone ? `<p><strong>Phone:</strong> ${formData.phone}</p>` : ''}
          <p><strong>Employees:</strong> ${formData.employees}</p>
          <p><strong>Interest:</strong> ${formData.interest}</p>
        </div>
        
        <div style="background: #fff3cd; padding: 15px; border-radius: 8px; border-left: 4px solid #ffc107;">
          <p style="margin: 0; color: #856404;">
            <strong>Priority:</strong> This is a quote request and should be prioritized for response.
          </p>
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

  async sendDemoBookingNotification(formData: any) {
    const subject = `New Demo Booking - ${formData.company || 'Unknown Company'}`;
    
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2155CD;">New Demo Booking</h2>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #333; margin-top: 0;">Booking Details</h3>
          <p><strong>Company:</strong> ${formData.company}</p>
          <p><strong>Contact:</strong> ${formData.name} (${formData.email})</p>
          ${formData.phone ? `<p><strong>Phone:</strong> ${formData.phone}</p>` : ''}
          <p><strong>Demo Type:</strong> ${formData.demoType || 'General Demo'}</p>
          <p><strong>Preferred Time:</strong> ${formData.preferredTime || 'Not specified'}</p>
        </div>
        
        <div style="background: #d4edda; padding: 15px; border-radius: 8px; border-left: 4px solid #28a745;">
          <p style="margin: 0; color: #155724;">
            <strong>Action Required:</strong> Please confirm the demo booking and send calendar invite.
          </p>
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

  async sendAutoReply(to: string, type: 'contact' | 'quote' | 'demo' = 'contact') {
    let subject: string;
    let html: string;

    switch (type) {
      case 'quote':
        subject = 'Thank you for your quote request - MonoHR';
        html = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2155CD;">Thank you for your quote request!</h2>
            <p>We've received your quote request and our team will review it carefully.</p>
            <p><strong>What happens next:</strong></p>
            <ul>
              <li>Our EOR specialists will analyze your requirements</li>
              <li>We'll prepare a customized quote within 24 hours</li>
              <li>You'll receive a detailed proposal via email</li>
            </ul>
            <p>If you have any urgent questions, please don't hesitate to contact us.</p>
            <p>Best regards,<br>The MonoHR Team</p>
          </div>
        `;
        break;
      case 'demo':
        subject = 'Demo booking confirmed - MonoHR';
        html = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2155CD;">Demo booking confirmed!</h2>
            <p>Thank you for booking a demo with us. We're excited to show you how MonoHR can help scale your team in India.</p>
            <p><strong>What to expect:</strong></p>
            <ul>
              <li>15-minute overview of our EOR solution</li>
              <li>Live demonstration of our platform</li>
              <li>Q&A session tailored to your needs</li>
            </ul>
            <p>We'll send you a calendar invite shortly with the meeting details.</p>
            <p>Best regards,<br>The MonoHR Team</p>
          </div>
        `;
        break;
      default:
        subject = 'Thank you for contacting us - MonoHR';
        html = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2155CD;">Thank you for contacting us!</h2>
            <p>We've received your message and will get back to you within 24 hours.</p>
            <p>In the meantime, feel free to explore our resources or book a demo to see our EOR solution in action.</p>
            <p>Best regards,<br>The MonoHR Team</p>
          </div>
        `;
    }

    return this.sendEmail({
      to,
      subject,
      html,
    });
  }
}

export const emailService = new EmailService();
