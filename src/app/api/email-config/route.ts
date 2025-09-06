import { NextResponse } from 'next/server';
import { getEmailConfig, getAWSConfig } from '@/lib/config';

export async function GET() {
  try {
    const emailConfig = getEmailConfig();
    const awsConfig = getAWSConfig();
    
    // Check if AWS credentials are configured
    const isAWSConfigured = !!(awsConfig.accessKeyId && awsConfig.secretAccessKey);
    
    return NextResponse.json({
      success: true,
      configuration: {
        aws: {
          configured: isAWSConfigured,
          region: awsConfig.region,
          hasAccessKey: !!awsConfig.accessKeyId,
          hasSecretKey: !!awsConfig.secretAccessKey,
        },
        email: {
          fromEmail: emailConfig.fromEmail,
          fromName: emailConfig.fromName,
          toEmail: emailConfig.toEmail,
          adminEmail: emailConfig.adminEmail,
          supportEmail: emailConfig.supportEmail,
        },
        status: {
          emailService: true,
          templates: true,
          awsSes: isAWSConfigured,
        }
      }
    });
  } catch (error) {
    console.error('Error checking email configuration:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to check configuration',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
