import { createClient } from "../../../../lib/supabase/server"

export default async function MemoryPage({ params }: { params: { id: string } }) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("memories")
    .select("*")
    .eq("id", params.id)
    .single()

  return (
    <div>
      <h1>Memory</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}
