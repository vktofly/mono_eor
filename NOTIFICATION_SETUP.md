# Contact Form Notification System Setup

This document explains how to set up the automated notification system for the contact form that sends alerts to Slack when a client registers.

## Features

- ✅ **Slack Notifications**: Rich formatted messages with client details and action buttons
- ✅ **Enhanced Confirmation**: Users see "We'll get back to you within 30 minutes" message
- ✅ **Non-blocking**: Form submission continues even if notifications fail
- ✅ **Error Handling**: Comprehensive error handling and logging

## Setup Instructions

### 1. Slack Configuration

1. Go to your Slack workspace
2. Create a new app or use an existing one
3. Enable Incoming Webhooks
4. Create a new webhook for your desired channel
5. Copy the webhook URL

Add to your `.env.local` file:
```bash
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK
```

### 2. Base URL Configuration

Add to your `.env.local` file:
```bash
NEXT_PUBLIC_BASE_URL=http://localhost:3000  # For development
# NEXT_PUBLIC_BASE_URL=https://yourdomain.com  # For production
```

## API Endpoints

### Slack Notification
- **Endpoint**: `/api/notifications/slack`
- **Method**: POST
- **Purpose**: Sends formatted notification to Slack channel

## Message Format

### Slack Message
- Header with alert emoji
- Client details in organized sections
- Action buttons for quick response
- Timestamp in IST

## Error Handling

- Slack notification doesn't block form submission
- Notification failures are logged but don't affect user experience
- Fallback mechanisms ensure form always works
- Comprehensive error logging for debugging

## Testing

1. Fill out the contact form
2. Check your Slack channel for the notification
3. Verify the confirmation message shows "30 minutes" response time

## Customization

### Slack Message Customization
Edit `src/app/api/notifications/slack/route.ts` to modify:
- Message format
- Button actions
- Channel routing
- Message styling

### Response Time Customization
Edit the following files to change response time:
- `src/app/contact/ContactPage.tsx` (line 107, 445)
- `src/app/api/contact/route.ts` (line 206)

## Troubleshooting

### Slack Notifications Not Working
1. Verify webhook URL is correct
2. Check Slack app permissions
3. Ensure webhook is enabled
4. Check server logs for errors

### General Issues
1. Check server logs for detailed error messages
2. Verify all environment variables are set
3. Test individual notification endpoints
4. Check network connectivity

## Security Notes

- Never commit webhook URLs to version control
- Use environment variables for all sensitive configuration
- Monitor notification logs for suspicious activity

## Support

For issues with this notification system, check:
1. Server logs for error details
2. Environment variable configuration
3. API endpoint accessibility
4. Slack service status
