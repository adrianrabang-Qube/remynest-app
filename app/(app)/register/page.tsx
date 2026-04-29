"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"

export default function RegisterPage() {
  const supabase = createClient()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleRegister = async () => {
    setLoading(true)

    const { error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      alert(error.message)
      setLoading(false)
      return
    }

    alert("Account created. You can now log in.")
    window.location.href = "/login"
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="p-6 border rounded w-80">
        <h1 className="text-xl mb-4">Register</h1>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border mb-4"
        />

        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border mb-4"
        />

        <button
          onClick={handleRegister}
          disabled={loading}
          className="w-full bg-black text-white p-2"
        >
          {loading ? "Creating..." : "Create Account"}
        </button>
      </div>
    </div>
  )
}