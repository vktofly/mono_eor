// Simple test script to check email configuration
const fetch = require('node-fetch');

async function testEmailConfig() {
  try {
    console.log('Testing email configuration...');
    
    const response = await fetch('http://localhost:3000/api/email-config');
    const data = await response.json();
    
    if (data.success) {
      console.log('✅ Configuration Status:');
      console.log('  AWS SES:', data.configuration.status.awsSes ? '✅ Configured' : '❌ Not configured');
      console.log('  Email Service:', data.configuration.status.emailService ? '✅ Available' : '❌ Not available');
      console.log('  Templates:', data.configuration.status.templates ? '✅ Loaded' : '❌ Not loaded');
      console.log('  From Email:', data.configuration.email.fromEmail);
      console.log('  From Name:', data.configuration.email.fromName);
      console.log('  AWS Region:', data.configuration.aws.region);
      console.log('  Has Access Key:', data.configuration.aws.hasAccessKey ? '✅ Yes' : '❌ No');
      console.log('  Has Secret Key:', data.configuration.aws.hasSecretKey ? '✅ Yes' : '❌ No');
      
      if (data.configuration.status.awsSes) {
        console.log('\n🎉 AWS SES is properly configured! Ready to send real emails.');
      } else {
        console.log('\n⚠️  AWS SES not configured. Will use simulation mode.');
      }
    } else {
      console.log('❌ Failed to get configuration:', data.error);
    }
  } catch (error) {
    console.log('❌ Error testing configuration:', error.message);
  }
}

testEmailConfig();
