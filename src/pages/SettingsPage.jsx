import Navbar from '../components/layout/Navbar.jsx'

export default function SettingsPage() {
  return (
    <div className="space-y-4">
      <Navbar title="Settings" />
      <div className="rounded-xl bg-white p-4 dark:bg-slate-900">
        <p className="text-sm text-slate-600 dark:text-slate-300">Use the navbar toggle to switch between dark and light themes.</p>
      </div>
    </div>
  )
}
