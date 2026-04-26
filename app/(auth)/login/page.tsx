import { createClient } from "../../../lib/supabase/client"
import { redirect } from "next/navigation"

export default async function LoginPage() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    redirect("/dashboard")
  }

  return (
    <div>
      <h1>Login</h1>
    </div>
  )
}
