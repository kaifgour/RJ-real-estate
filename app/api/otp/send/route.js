import { NextResponse } from 'next/server'
import twilio from 'twilio'
import { supabase } from '@/lib/supabaseClient'

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
)

export async function POST(req) {
  try {
    const { phone, name, email, property } = await req.json()

    if (!phone || phone.length !== 10) {
      return NextResponse.json(
        { error: 'Invalid phone number' },
        { status: 400 }
      )
    }
    await supabase.from('leads').insert({
      name,
      phone,
      email,
      property,
      otp_sent: true,
      status: 'drop_off'
    })


    await client.verify.v2
      .services(process.env.TWILIO_VERIFY_SID)
      .verifications.create({
        to: `+91${phone}`,
        channel: 'sms'
      })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Failed to send WhatsApp OTP' },
      { status: 500 }
    )
  }
}
