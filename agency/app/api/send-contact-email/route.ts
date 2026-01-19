import { NextRequest, NextResponse } from 'next/server'
import { sendContactEmail, sendConfirmationEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Send emails
    await Promise.all([
      sendContactEmail(data),
      sendConfirmationEmail(data.email, 'contact', data)
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
