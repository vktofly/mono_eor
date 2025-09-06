import { getEmailConfig, getAWSConfig } from './config';

interface EmailData {
  to: string | string[];
  from?: string;
  subject: string;
  text?: string;
  html?: string;
  replyTo?: string;
  cc?: string | string[];
  bcc?: string | string[];
  attachments?: Array<{
    filename: string;
    content: string | Buffer;
    contentType?: string;
  }>;
}

interface EmailTemplate {
  name: string;
  subject: string;
  html: string;
  text: string;
}

class EmailService {
  private config: ReturnType<typeof getEmailConfig>;
  private awsConfig: ReturnType<typeof getAWSConfig>;

  constructor() {
    this.config = getEmailConfig();
    this.awsConfig = getAWSConfig();
  }

  // Send email using AWS SES
  async sendEmail(emailData: EmailData): Promise<{ success: boolean; messageId?: string; error?: string }> {
    try {
      // For now, we'll use a simple fetch to a custom API endpoint
      // In production, you'd use AWS SDK
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: Array.isArray(emailData.to) ? emailData.to : [emailData.to],
          from: emailData.from || this.config.fromEmail,
          subject: emailData.subject,
          text: emailData.text,
          html: emailData.html,
          replyTo: emailData.replyTo || this.config.replyTo,
          cc: emailData.cc ? (Array.isArray(emailData.cc) ? emailData.cc : [emailData.cc]) : undefined,
          bcc: emailData.bcc ? (Array.isArray(emailData.bcc) ? emailData.bcc : [emailData.bcc]) : undefined,
        }),
      });

      if (!response.ok) {
        throw new Error(`Email sending failed: ${response.statusText}`);
      }

      const result = await response.json();
      return {
        success: true,
        messageId: result.messageId,
      };
    } catch (error) {
      console.error('Error sending email:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  // Send welcome email
  async sendWelcomeEmail(userEmail: string, userName?: string): Promise<{ success: boolean; error?: string }> {
    const template = this.getEmailTemplate('welcome');
    
    const html = template.html
      .replace('{{userName}}', userName || 'there')
      .replace('{{userEmail}}', userEmail);

    const text = template.text
      .replace('{{userName}}', userName || 'there')
      .replace('{{userEmail}}', userEmail);

    return await this.sendEmail({
      to: userEmail,
      subject: template.subject,
      html,
      text,
    });
  }

  // Send contact form email
  async sendContactFormEmail(formData: {
    name: string;
    email: string;
    company?: string;
    phone?: string;
    message: string;
    subject?: string;
  }): Promise<{ success: boolean; error?: string }> {
    const template = this.getEmailTemplate('contact-form');
    
    const html = template.html
      .replace('{{name}}', formData.name)
      .replace('{{email}}', formData.email)
      .replace('{{company}}', formData.company || 'Not provided')
      .replace('{{phone}}', formData.phone || 'Not provided')
      .replace('{{message}}', formData.message)
      .replace('{{subject}}', formData.subject || 'General Inquiry');

    const text = template.text
      .replace('{{name}}', formData.name)
      .replace('{{email}}', formData.email)
      .replace('{{company}}', formData.company || 'Not provided')
      .replace('{{phone}}', formData.phone || 'Not provided')
      .replace('{{message}}', formData.message)
      .replace('{{subject}}', formData.subject || 'General Inquiry');

    return await this.sendEmail({
      to: this.config.toEmail,
      subject: `New Contact Form Submission from ${formData.name}`,
      html,
      text,
      replyTo: formData.email,
    });
  }

  // Send quote request email
  async sendQuoteRequestEmail(formData: {
    name: string;
    email: string;
    company: string;
    teamSize: string;
    services: string[];
    timeline: string;
    message?: string;
  }): Promise<{ success: boolean; error?: string }> {
    const template = this.getEmailTemplate('quote-request');
    
    const servicesList = formData.services.join(', ');
    
    const html = template.html
      .replace('{{name}}', formData.name)
      .replace('{{email}}', formData.email)
      .replace('{{company}}', formData.company)
      .replace('{{teamSize}}', formData.teamSize)
      .replace('{{services}}', servicesList)
      .replace('{{timeline}}', formData.timeline)
      .replace('{{message}}', formData.message || 'No additional message');

    const text = template.text
      .replace('{{name}}', formData.name)
      .replace('{{email}}', formData.email)
      .replace('{{company}}', formData.company)
      .replace('{{teamSize}}', formData.teamSize)
      .replace('{{services}}', servicesList)
      .replace('{{timeline}}', formData.timeline)
      .replace('{{message}}', formData.message || 'No additional message');

    return await this.sendEmail({
      to: this.config.toEmail,
      subject: `Quote Request from ${formData.name} - ${formData.company}`,
      html,
      text,
      replyTo: formData.email,
    });
  }

  // Send demo request email
  async sendDemoRequestEmail(formData: {
    name: string;
    email: string;
    company: string;
    role: string;
    teamSize: string;
    preferredDate?: string;
    preferredTime?: string;
    message?: string;
  }): Promise<{ success: boolean; error?: string }> {
    const template = this.getEmailTemplate('demo-request');
    
    const html = template.html
      .replace('{{name}}', formData.name)
      .replace('{{email}}', formData.email)
      .replace('{{company}}', formData.company)
      .replace('{{role}}', formData.role)
      .replace('{{teamSize}}', formData.teamSize)
      .replace('{{preferredDate}}', formData.preferredDate || 'Not specified')
      .replace('{{preferredTime}}', formData.preferredTime || 'Not specified')
      .replace('{{message}}', formData.message || 'No additional message');

    const text = template.text
      .replace('{{name}}', formData.name)
      .replace('{{email}}', formData.email)
      .replace('{{company}}', formData.company)
      .replace('{{role}}', formData.role)
      .replace('{{teamSize}}', formData.teamSize)
      .replace('{{preferredDate}}', formData.preferredDate || 'Not specified')
      .replace('{{preferredTime}}', formData.preferredTime || 'Not specified')
      .replace('{{message}}', formData.message || 'No additional message');

    return await this.sendEmail({
      to: this.config.toEmail,
      subject: `Demo Request from ${formData.name} - ${formData.company}`,
      html,
      text,
      replyTo: formData.email,
    });
  }

  // Send newsletter email
  async sendNewsletterEmail(
    subscribers: string[],
    subject: string,
    content: string
  ): Promise<{ success: boolean; error?: string }> {
    const template = this.getEmailTemplate('newsletter');
    
    const html = template.html.replace('{{content}}', content);
    const text = template.text.replace('{{content}}', content);

    return await this.sendEmail({
      to: subscribers,
      subject,
      html,
      text,
    });
  }

  // Send password reset email
  async sendPasswordResetEmail(userEmail: string, resetToken: string): Promise<{ success: boolean; error?: string }> {
    const template = this.getEmailTemplate('password-reset');
    const resetUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/reset-password?token=${resetToken}`;
    
    const html = template.html
      .replace('{{resetUrl}}', resetUrl)
      .replace('{{userEmail}}', userEmail);

    const text = template.text
      .replace('{{resetUrl}}', resetUrl)
      .replace('{{userEmail}}', userEmail);

    return await this.sendEmail({
      to: userEmail,
      subject: template.subject,
      html,
      text,
    });
  }

  // Get email template
  private getEmailTemplate(templateName: string): EmailTemplate {
    const templates: Record<string, EmailTemplate> = {
      welcome: {
        name: 'welcome',
        subject: 'Welcome to MonoHR - Your EOR Journey Starts Here!',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #2155CD;">Welcome to MonoHR, {{userName}}!</h1>
            <p>Thank you for joining MonoHR. We're excited to help you scale your team in India.</p>
            <p>Your email: {{userEmail}}</p>
            <p>What's next?</p>
            <ul>
              <li>Explore our EOR services</li>
              <li>Schedule a consultation</li>
              <li>Get your custom quote</li>
            </ul>
            <p>Best regards,<br>The MonoHR Team</p>
          </div>
        `,
        text: `
          Welcome to MonoHR, {{userName}}!
          
          Thank you for joining MonoHR. We're excited to help you scale your team in India.
          
          Your email: {{userEmail}}
          
          What's next?
          - Explore our EOR services
          - Schedule a consultation
          - Get your custom quote
          
          Best regards,
          The MonoHR Team
        `,
      },
      'contact-form': {
        name: 'contact-form',
        subject: 'New Contact Form Submission',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2155CD;">New Contact Form Submission</h2>
            <p><strong>Name:</strong> {{name}}</p>
            <p><strong>Email:</strong> {{email}}</p>
            <p><strong>Company:</strong> {{company}}</p>
            <p><strong>Phone:</strong> {{phone}}</p>
            <p><strong>Subject:</strong> {{subject}}</p>
            <p><strong>Message:</strong></p>
            <p style="background: #f5f5f5; padding: 15px; border-radius: 5px;">{{message}}</p>
          </div>
        `,
        text: `
          New Contact Form Submission
          
          Name: {{name}}
          Email: {{email}}
          Company: {{company}}
          Phone: {{phone}}
          Subject: {{subject}}
          
          Message:
          {{message}}
        `,
      },
      'quote-request': {
        name: 'quote-request',
        subject: 'New Quote Request',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2155CD;">New Quote Request</h2>
            <p><strong>Name:</strong> {{name}}</p>
            <p><strong>Email:</strong> {{email}}</p>
            <p><strong>Company:</strong> {{company}}</p>
            <p><strong>Team Size:</strong> {{teamSize}}</p>
            <p><strong>Services:</strong> {{services}}</p>
            <p><strong>Timeline:</strong> {{timeline}}</p>
            <p><strong>Additional Message:</strong></p>
            <p style="background: #f5f5f5; padding: 15px; border-radius: 5px;">{{message}}</p>
          </div>
        `,
        text: `
          New Quote Request
          
          Name: {{name}}
          Email: {{email}}
          Company: {{company}}
          Team Size: {{teamSize}}
          Services: {{services}}
          Timeline: {{timeline}}
          
          Additional Message:
          {{message}}
        `,
      },
      'demo-request': {
        name: 'demo-request',
        subject: 'New Demo Request',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2155CD;">New Demo Request</h2>
            <p><strong>Name:</strong> {{name}}</p>
            <p><strong>Email:</strong> {{email}}</p>
            <p><strong>Company:</strong> {{company}}</p>
            <p><strong>Role:</strong> {{role}}</p>
            <p><strong>Team Size:</strong> {{teamSize}}</p>
            <p><strong>Preferred Date:</strong> {{preferredDate}}</p>
            <p><strong>Preferred Time:</strong> {{preferredTime}}</p>
            <p><strong>Additional Message:</strong></p>
            <p style="background: #f5f5f5; padding: 15px; border-radius: 5px;">{{message}}</p>
          </div>
        `,
        text: `
          New Demo Request
          
          Name: {{name}}
          Email: {{email}}
          Company: {{company}}
          Role: {{role}}
          Team Size: {{teamSize}}
          Preferred Date: {{preferredDate}}
          Preferred Time: {{preferredTime}}
          
          Additional Message:
          {{message}}
        `,
      },
      newsletter: {
        name: 'newsletter',
        subject: 'MonoHR Newsletter',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #2155CD;">MonoHR Newsletter</h1>
            {{content}}
            <p>Best regards,<br>The MonoHR Team</p>
          </div>
        `,
        text: `
          MonoHR Newsletter
          
          {{content}}
          
          Best regards,
          The MonoHR Team
        `,
      },
      'password-reset': {
        name: 'password-reset',
        subject: 'Reset Your Password - MonoHR',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #2155CD;">Reset Your Password</h1>
            <p>Hello,</p>
            <p>You requested to reset your password for your MonoHR account ({{userEmail}}).</p>
            <p>Click the button below to reset your password:</p>
            <a href="{{resetUrl}}" style="background: #2155CD; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">Reset Password</a>
            <p>If the button doesn't work, copy and paste this link into your browser:</p>
            <p>{{resetUrl}}</p>
            <p>This link will expire in 24 hours.</p>
            <p>If you didn't request this password reset, please ignore this email.</p>
          </div>
        `,
        text: `
          Reset Your Password
          
          Hello,
          
          You requested to reset your password for your MonoHR account ({{userEmail}}).
          
          Click the link below to reset your password:
          {{resetUrl}}
          
          This link will expire in 24 hours.
          
          If you didn't request this password reset, please ignore this email.
        `,
      },
    };

    return templates[templateName] || templates.welcome;
  }
}

// Export singleton instance
export const emailService = new EmailService();

// Helper functions
export async function sendWelcomeEmail(userEmail: string, userName?: string) {
  return await emailService.sendWelcomeEmail(userEmail, userName);
}

export async function sendContactFormEmail(formData: any) {
  return await emailService.sendContactFormEmail(formData);
}

export async function sendQuoteRequestEmail(formData: any) {
  return await emailService.sendQuoteRequestEmail(formData);
}

export async function sendDemoRequestEmail(formData: any) {
  return await emailService.sendDemoRequestEmail(formData);
}