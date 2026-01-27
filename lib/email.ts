import nodemailer from 'nodemailer'

interface EmailConfig {
  host: string
  port: number
  user: string
  pass: string
  from: string
}

const getEmailConfig = (): EmailConfig => ({
  host: process.env.SMTP_HOST || 'smtp.mailtrap.io',
  port: Number(process.env.SMTP_PORT) || 2525,
  user: process.env.SMTP_USER || '',
  pass: process.env.SMTP_PASSWORD || '',
  from: process.env.SMTP_FROM || 'info@eshrm.africa',
})

const createTransporter = () => {
  const config = getEmailConfig()
  const encryption = process.env.SMTP_ENCRYPTION || 'tls'
  return nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.port === 465 || encryption === 'ssl', // true for 465 or SSL, false for other ports
    auth: {
      user: config.user,
      pass: config.pass,
    },
  })
}

export const sendContactEmail = async (data: {
  name: string
  email: string
  company?: string
  serviceInterest?: string
  message: string
}) => {
  const transporter = createTransporter()
  const config = getEmailConfig()

  const mailOptions = {
    from: config.from,
    to: 'info@eshrm.africa', // Admin email
    subject: `New Contact Form Submission from ${data.name}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Company:</strong> ${data.company || 'Not provided'}</p>
      <p><strong>Service Interest:</strong> ${data.serviceInterest || 'Not specified'}</p>
      <p><strong>Message:</strong></p>
      <p>${data.message.replace(/\n/g, '<br>')}</p>
    `,
  }

  return transporter.sendMail(mailOptions)
}

export const sendBookingEmail = async (data: {
  name: string
  email: string
  phone?: string
  company?: string
  service?: string
  booking_date: string
  booking_time: string
  consultation_type: string
  message?: string
}) => {
  const transporter = createTransporter()
  const config = getEmailConfig()

  const mailOptions = {
    from: config.from,
    to: 'info@eshrm.africa', // Admin email
    subject: `New Consultation Booking from ${data.name}`,
    html: `
      <h2>New Consultation Booking</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phone || 'Not provided'}</p>
      <p><strong>Company:</strong> ${data.company || 'Not provided'}</p>
      <p><strong>Service:</strong> ${data.service || 'Not specified'}</p>
      <p><strong>Consultation Type:</strong> ${data.consultation_type}</p>
      <p><strong>Date:</strong> ${data.booking_date}</p>
      <p><strong>Time:</strong> ${data.booking_time}</p>
      ${data.message ? `<p><strong>Message:</strong></p><p>${data.message.replace(/\n/g, '<br>')}</p>` : ''}
    `,
  }

  return transporter.sendMail(mailOptions)
}

export const sendConfirmationEmail = async (email: string, type: 'contact' | 'booking', data?: any) => {
  const transporter = createTransporter()
  const config = getEmailConfig()

  let subject: string
  let html: string

  if (type === 'contact') {
    subject = 'Thank you for contacting ESHRM'
    html = `
      <h2>Thank you for contacting us!</h2>
      <p>Dear ${data.name},</p>
      <p>We have received your message and will get back to you within 24-48 hours.</p>
      <p><strong>Your message:</strong></p>
      <p>${data.message.replace(/\n/g, '<br>')}</p>
      <br>
      <p>Best regards,<br>ESHRM Team</p>
    `
  } else {
    subject = 'Consultation Booking Confirmed'
    html = `
      <h2>Your consultation booking is confirmed!</h2>
      <p>Dear ${data.name},</p>
      <p>Thank you for scheduling a consultation with ESHRM. Here are the details:</p>
      <p><strong>Date:</strong> ${data.booking_date}</p>
      <p><strong>Time:</strong> ${data.booking_time}</p>
      <p><strong>Type:</strong> ${data.consultation_type} Consultation</p>
      <p><strong>Service:</strong> ${data.service || 'Not specified'}</p>
      <br>
      <p>We will send you a calendar invite and meeting details shortly.</p>
      <p>Best regards,<br>ESHRM Team</p>
    `
  }

  const mailOptions = {
    from: config.from,
    to: email,
    subject,
    html,
  }

  return transporter.sendMail(mailOptions)
}
