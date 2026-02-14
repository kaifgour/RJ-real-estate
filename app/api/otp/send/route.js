import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

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

    const { error } = await supabase
      .from('leads')
      .upsert(
        {
          name,
          email,
          phone,
          property,
          status: 'verified', // Directly mark as verified
          otp_sent: false,     // No OTP
          otp_verified: true,  // Direct verified
          verified_at: new Date().toISOString()
        },
        { onConflict: 'phone' }
      )

    if (error) {
      console.error('Supabase insert error:', error)
      return NextResponse.json({ error: 'DB insert failed' }, { status: 500 })
    }

    return NextResponse.json({ success: true })

  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Lead save failed' }, { status: 500 })
  }
}
