import { NextResponse } from 'next/server'
import twilio from 'twilio'

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
)

export async function POST(req) {
  try {
    const { phone, otp } = await req.json()

    const check = await client.verify.v2
      .services(process.env.TWILIO_VERIFY_SID)
      .verificationChecks.create({
        to: `+91${phone}`,
        code: otp
      })

    if (check.status !== 'approved') {
      return NextResponse.json(
        { error: 'Invalid OTP' },
        { status: 400 }
      )
    }

    await supabase
      .from('leads')
      .update({
        otp_verified: true,
        status: 'verified',
        verified_at: new Date().toISOString()
      })
      .eq('phone', phone)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'OTP verification failed' },
      { status: 500 }
    )
  }
}
