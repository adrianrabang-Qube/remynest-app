export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-xl mx-auto px-4 py-6">
      <nav className="flex gap-4 mb-6 text-sm text-gray-500">
        <a href="/dashboard">Dashboard</a>
        <a href="/memories">Memories</a>
        <a href="/memories/new">New</a>
        <a href="/timeline">Timeline</a>
        <a href="/reminders">Reminders</a>
      </nav>

      <main>{children}</main>
    </div>
  );
}