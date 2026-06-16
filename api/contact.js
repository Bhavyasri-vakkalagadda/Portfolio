import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  // Use environment variables for security
  const EMAIL_USER = process.env.EMAIL_USER || 'v.bhavyasri2001@gmail.com';
  const EMAIL_PASS = process.env.EMAIL_PASS;

  if (!EMAIL_PASS) {
    console.error('SERVER ERROR: EMAIL_PASS environment variable is not set.');
    return res.status(500).json({ error: 'Server configuration error. Please check environment variables.' });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: email,
    to: 'v.bhavyasri2001@gmail.com',
    subject: `New Portfolio Message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ error: 'Failed to send message. Please ensure email configuration is correct.' });
  }
}
