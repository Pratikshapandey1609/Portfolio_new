// EmailJS Configuration
// You need to set up EmailJS account and replace these values

export const emailjsConfig = {
  // Get these from your EmailJS dashboard
  serviceId: 'service_your_service_id', // Replace with your EmailJS service ID
  templateId: 'template_your_template_id', // Replace with your EmailJS template ID
  publicKey: 'your_public_key', // Replace with your EmailJS public key
  
  // Your email where you want to receive messages
  toEmail: 'pratishapandey239@gmail.com',
};

// Instructions to set up EmailJS:
/*
1. Go to https://www.emailjs.com/
2. Create a free account
3. Create an email service (Gmail, Outlook, etc.)
4. Create an email template with these variables:
   - {{from_name}} - Sender's name
   - {{from_email}} - Sender's email
   - {{subject}} - Message subject
   - {{message}} - Message content
   - {{to_email}} - Your email (pratishapandey239@gmail.com)
5. Get your Service ID, Template ID, and Public Key
6. Replace the values above with your actual IDs
7. Test the form to make sure emails are being sent

Template example:
Subject: New Contact Form Message from {{from_name}}

Hello Pratiksha,

You have received a new message from your portfolio contact form:

Name: {{from_name}}
Email: {{from_email}}
Subject: {{subject}}

Message:
{{message}}

Best regards,
Portfolio Contact Form
*/