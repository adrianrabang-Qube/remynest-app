"use client"

import { createClient } from "@/lib/supabase/client"
import { useState } from "react"

export default function LoginPage() {
  const supabase = createClient()
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    setLoading(true)

    await supabase.auth.signInWithOtp({
      email,
    })

    setLoading(false)
    alert("Check your email for login link")
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="p-6 border rounded w-80">
        <h1 className="text-xl mb-4">Login</h1>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border mb-4"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-black text-white p-2"
        >
          {loading ? "Sending..." : "Send Magic Link"}
        </button>
      </div>
    </div>
  )
}