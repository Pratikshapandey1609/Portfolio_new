# Email Setup Guide for Contact Form

## Overview
Your portfolio now has email functionality! When someone fills out the contact form, you'll receive an email notification at `pratishapandey239@gmail.com`.

## Setup Steps

### 1. Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account (allows 200 emails/month)
3. Verify your email address

### 2. Add Email Service
1. In EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose "Gmail" (recommended)
4. Connect your Gmail account (`pratishapandey239@gmail.com`)
5. Note down the **Service ID** (e.g., `service_abc123`)

### 3. Create Email Template
1. Go to "Email Templates" in dashboard
2. Click "Create New Template"
3. Use this template:

**Template Name:** `portfolio_contact`

**Subject:** `New Contact Form Message from {{from_name}}`

**Content:**
```
Hello Pratiksha,

You have received a new message from your portfolio contact form:

Name: {{from_name}}
Email: {{from_email}}
Subject: {{subject}}

Message:
{{message}}

---
Sent from your Portfolio Contact Form
Time: {{sent_at}}
```

4. Save and note down the **Template ID** (e.g., `template_xyz789`)

### 4. Get Public Key
1. Go to "Account" → "General"
2. Find your **Public Key** (e.g., `user_abcdef123`)

### 5. Update Configuration
1. Open `src/config/emailjs.js`
2. Replace the placeholder values:

```javascript
export const emailjsConfig = {
  serviceId: 'service_abc123', // Your actual Service ID
  templateId: 'template_xyz789', // Your actual Template ID
  publicKey: 'user_abcdef123', // Your actual Public Key
  toEmail: 'pratishapandey239@gmail.com',
};
```

### 6. Test the Form
1. Save the changes
2. The app will automatically reload
3. Fill out the contact form on your portfolio
4. Check your email for the notification

## Features Included

✅ **Email Notifications** - Get notified when someone contacts you
✅ **Form Validation** - Required fields are validated
✅ **Loading States** - Shows "Sending..." while processing
✅ **Success/Error Messages** - User feedback after submission
✅ **Professional Template** - Clean email format with all details
✅ **Spam Protection** - EmailJS has built-in spam protection

## Troubleshooting

### Common Issues:

1. **"Failed to send message"**
   - Check if Service ID, Template ID, and Public Key are correct
   - Verify Gmail service is connected properly
   - Check EmailJS dashboard for error logs

2. **Emails not received**
   - Check spam/junk folder
   - Verify template variables are correct
   - Test with EmailJS dashboard first

3. **Form not submitting**
   - Check browser console for errors
   - Ensure all required fields are filled

### Testing:
1. Use EmailJS dashboard to send test emails first
2. Test the form with your own email
3. Check that all template variables are working

## Security Notes

- EmailJS public key is safe to use in frontend code
- No sensitive credentials are exposed
- Rate limiting prevents spam abuse
- All emails are logged in EmailJS dashboard

## Free Tier Limits

- **200 emails/month** (free tier)
- **50 emails/day** maximum
- **2MB** attachment limit
- **Basic** email templates

For higher limits, consider upgrading to EmailJS paid plan.

## Support

If you need help setting this up:
1. Check EmailJS documentation: https://www.emailjs.com/docs/
2. Test configuration in EmailJS dashboard first
3. Contact me if you encounter issues

---

Once set up, your portfolio will automatically send you email notifications whenever someone contacts you through the form! 🎉