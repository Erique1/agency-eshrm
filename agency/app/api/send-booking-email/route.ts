import { NextRequest, NextResponse } from 'next/server'
import { sendBookingEmail, sendConfirmationEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Send emails
    await Promise.all([
      sendBookingEmail(data),
      sendConfirmationEmail(data.email, 'booking', data)
    ])

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Email sending failed:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to send email' },
      { status: 500 }
    )
  }
}
