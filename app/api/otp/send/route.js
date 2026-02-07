import { NextResponse } from 'next/server'
import twilio from 'twilio'
import { createClient } from '@supabase/supabase-js'

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
)

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function POST(req) {
  try {
    const { name, phone, email, property } = await req.json()

    if (!phone || phone.length !== 10) {
      return NextResponse.json({ error: 'Invalid phone' }, { status: 400 })
    }

    const { error } = await supabase.from('leads').insert({
      name,
      phone,
      email,
      property,
      otp_sent: true,
      status: 'drop_off'
    })

    if (error) {
      console.error('Supabase insert error:', error)
      return NextResponse.json({ error: 'DB insert failed' }, { status: 500 })
    }

    await client.verify.v2
      .services(process.env.TWILIO_VERIFY_SID)
      .verifications.create({
        to: `+91${phone}`,
        channel: 'sms'
      })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'OTP send failed' }, { status: 500 })
  }
}
