import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  try {
    // ✅ Get message from URL query param
    const { searchParams } = new URL(req.url)
    const message = searchParams.get('message')

    // ❌ If no message → return error
    if (!message) {
      return NextResponse.json(
        { error: 'No message provided' },
        { status: 400 }
      )
    }

    // ✅ Send notification via OneSignal
    const res = await fetch('https://onesignal.com/api/v1/notifications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${process.env.ONESIGNAL_API_KEY}`,
      },
      body: JSON.stringify({
        app_id: process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID,
        included_segments: ['All'],
        contents: { en: message },
      }),
    })

    const data = await res.json()

    // ✅ Return success
    return NextResponse.json({
      success: true,
      onesignal: data,
    })

  } catch (err) {
    console.error(err)

    return NextResponse.json(
      {
        error: 'Server crash',
        details: err,
      },
      { status: 500 }
    )
  }
}