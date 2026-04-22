import { useNavigate } from 'react-router-dom'
import { BarChart3, TrendingUp, Shield, Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function LandingPage() {
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [demoStatus, setDemoStatus] = useState('')
  const [demoForm, setDemoForm] = useState({ name: '', email: '', company: '', message: '' })

  const goToAuth = (mode) => navigate('/auth', { state: { mode, from: '/dashboard' } })

  const scrollToSection = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setIsMenuOpen(false)
  }

  const submitDemo = (e) => {
    e.preventDefault()
    const subject = `FinSight demo request${demoForm.company ? ` - ${demoForm.company}` : ''}`
    const body = `Name: ${demoForm.name}\nEmail: ${demoForm.email}\nCompany: ${demoForm.company}\n\nMessage:\n${demoForm.message}`
    // Opens the user's email client (no backend needed)
    window.location.href = `mailto:demo@finsight.app?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setDemoStatus('Thanks! Your demo request is ready to send in your email client.')
  }

  return (
    <div id="top" className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Gradient orbs */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>

        {/* Chart icons in background */}
        <div className="absolute top-32 left-20 opacity-5 text-blue-400">
          <BarChart3 size={120} />
        </div>
        <div className="absolute bottom-40 right-32 opacity-5 text-blue-300">
          <TrendingUp size={100} />
        </div>
        <div className="absolute top-1/2 right-20 opacity-5 text-purple-400">
          <BarChart3 size={90} />
        </div>

        {/* Decorative star/sparkle */}
        <div className="absolute bottom-32 right-10 text-blue-300 animate-pulse">
          <div className="w-8 h-8 border-2 border-blue-300 rounded-lg transform rotate-45"></div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <button type="button" onClick={() => scrollToSection('top')} className="flex items-center gap-2 text-2xl font-bold">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-600 rounded-lg flex items-center justify-center">
              <BarChart3 size={20} />
            </div>
            <span>FinSight</span>
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <button type="button" onClick={() => scrollToSection('overview')} className="hover:text-blue-300 transition">Overview</button>
            <button type="button" onClick={() => scrollToSection('analytics')} className="hover:text-blue-300 transition">Analytics</button>
            <button type="button" onClick={() => scrollToSection('features')} className="hover:text-blue-300 transition">Features</button>
            <button type="button" onClick={() => scrollToSection('security')} className="hover:text-blue-300 transition">Security</button>
            <button type="button" onClick={() => scrollToSection('demo')} className="hover:text-blue-300 transition">Demo</button>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => goToAuth('login')}
              className="px-4 py-2 text-slate-300 hover:text-white transition"
            >
              Log in
            </button>
            <button
              onClick={() => goToAuth('signup')}
              className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition font-semibold"
            >
              Sign up
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-slate-900/95 backdrop-blur border-t border-slate-700 p-4 space-y-3">
            <button type="button" onClick={() => scrollToSection('overview')} className="block w-full text-left hover:text-blue-300 transition py-2">Overview</button>
            <button type="button" onClick={() => scrollToSection('analytics')} className="block w-full text-left hover:text-blue-300 transition py-2">Analytics</button>
            <button type="button" onClick={() => scrollToSection('features')} className="block w-full text-left hover:text-blue-300 transition py-2">Features</button>
            <button type="button" onClick={() => scrollToSection('security')} className="block w-full text-left hover:text-blue-300 transition py-2">Security</button>
            <button type="button" onClick={() => scrollToSection('demo')} className="block w-full text-left hover:text-blue-300 transition py-2">Demo</button>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => goToAuth('login')}
                className="flex-1 px-4 py-2 text-slate-300 border border-slate-600 rounded-lg hover:bg-slate-800 transition"
              >
                Log in
              </button>
              <button
                onClick={() => goToAuth('signup')}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold hover:shadow-lg transition"
              >
                Sign up
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-20">
        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 border border-blue-500/50 rounded-full text-sm font-semibold text-blue-300">
            <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
            FINTECH ANALYTICS PLATFORM
          </div>

          {/* Main Heading */}
          <div className="space-y-3">
            <h1 className="text-5xl md:text-7xl font-black leading-tight">
              <div>Visualize.</div>
              <div className="bg-gradient-to-r from-blue-400 via-blue-300 to-purple-400 text-transparent bg-clip-text">
                Plan.
              </div>
              <div>Secure.</div>
            </h1>
          </div>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Integrate all your financial documents. Visualize trends, build predictive models, turn data into insights. All in one place with enterprise-grade security.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <button
              onClick={() => goToAuth('signup')}
              className="group px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold text-white hover:shadow-2xl hover:shadow-blue-500/50 transition transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <Shield size={20} />
              Connect Your First Account
            </button>
            <button
              onClick={() => scrollToSection('demo')}
              className="px-8 py-3 border border-blue-500/50 rounded-lg font-semibold text-blue-300 hover:bg-blue-500/10 hover:border-blue-400 transition hover:shadow-lg hover:shadow-blue-500/20"
            >
              Request a Demo
            </button>
          </div>
        </div>

        {/* Floating Cards */}
        <div className="absolute bottom-20 left-8 md:left-20 opacity-40 md:opacity-60 animate-float">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-4 rounded-lg border border-blue-500/30 backdrop-blur w-40">
            <div className="text-blue-400 text-xs font-semibold mb-2">Monthly Revenue</div>
            <div className="text-2xl font-bold">.2K</div>
            <div className="text-green-400 text-xs mt-1">? 12.5% from last month</div>
          </div>
        </div>

        <div className="absolute bottom-32 right-8 md:right-20 opacity-40 md:opacity-60 animate-float animation-delay-1000">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-4 rounded-lg border border-purple-500/30 backdrop-blur w-40">
            <div className="text-purple-400 text-xs font-semibold mb-2">Expenses</div>
            <div className="text-2xl font-bold">.8K</div>
            <div className="text-red-400 text-xs mt-1">? 5.2% from last month</div>
          </div>
        </div>
      </div>

      {/* Overview Section */}
      <section id="overview" className="relative scroll-mt-28 py-20 px-4">
        <div className="max-w-6xl mx-auto grid gap-10 lg:grid-cols-2 items-center">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-extrabold">Everything you need to run your money like a business</h2>
            <p className="text-slate-300 leading-relaxed">
              FinSight brings transactions, budgets, goals, analytics, and rent tracking into a single dashboard so you can make decisions faster.
            </p>
            <ul className="space-y-2 text-slate-200">
              <li>• Track income/expense with category insights</li>
              <li>• Monthly trends + subscriptions detection</li>
              <li>• Budgets & goals with progress visibility</li>
            </ul>
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                onClick={() => goToAuth('signup')}
                className="px-6 py-3 bg-white/10 hover:bg-white/15 border border-white/10 rounded-lg font-semibold"
              >
                Create free account
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('demo')}
                className="px-6 py-3 border border-blue-500/50 rounded-lg font-semibold text-blue-200 hover:bg-blue-500/10"
              >
                See a demo
              </button>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-white/10 bg-slate-950/30 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">One dashboard</p>
                <p className="mt-2 text-2xl font-bold">7 modules</p>
                <p className="mt-1 text-sm text-slate-300">Transactions, budgets, goals, reports, rent, settings.</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-slate-950/30 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Actionable insights</p>
                <p className="mt-2 text-2xl font-bold">Trends</p>
                <p className="mt-1 text-sm text-slate-300">Know where the money goes — instantly.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Analytics Section */}
      <section id="analytics" className="relative scroll-mt-28 py-20 px-4">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="space-y-2">
            <h2 className="text-3xl md:text-4xl font-extrabold">Analytics that help you act</h2>
            <p className="text-slate-300">Visualize spending patterns and track progress over time.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-6 backdrop-blur">
              <p className="text-sm font-semibold text-blue-200">Monthly trends</p>
              <p className="mt-2 text-slate-300">See income vs expense trends and forecast your month-end spending.</p>
            </div>
            <div className="rounded-2xl border border-purple-500/20 bg-purple-500/5 p-6 backdrop-blur">
              <p className="text-sm font-semibold text-purple-200">Category breakdown</p>
              <p className="mt-2 text-slate-300">Understand where you overspend and rebalance quickly.</p>
            </div>
            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6 backdrop-blur">
              <p className="text-sm font-semibold text-emerald-200">Health score</p>
              <p className="mt-2 text-slate-300">A simple score based on savings rate and budget usage.</p>
            </div>
          </div>
          <div className="flex justify-center">
            <button
              type="button"
              onClick={() => navigate('/auth', { state: { mode: 'login', from: '/analytics' } })}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/40"
            >
              Explore analytics in the dashboard
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative scroll-mt-28 py-20 px-4">
        <div className="max-w-5xl mx-auto z-10 relative">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group p-6 rounded-xl border border-blue-500/20 bg-blue-500/5 hover:bg-blue-500/10 transition backdrop-blur">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition">
                <BarChart3 size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Real-time Analytics</h3>
              <p className="text-slate-400">Track your financial metrics with live dashboards and instant insights.</p>
            </div>

            <div className="group p-6 rounded-xl border border-purple-500/20 bg-purple-500/5 hover:bg-purple-500/10 transition backdrop-blur">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition">
                <TrendingUp size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Smart Planning</h3>
              <p className="text-slate-400">Create budgets, set financial goals, and get AI-powered recommendations.</p>
            </div>

            <div className="group p-6 rounded-xl border border-blue-500/20 bg-blue-500/5 hover:bg-blue-500/10 transition backdrop-blur">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition">
                <Shield size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Enterprise Security</h3>
              <p className="text-slate-400">Bank-grade encryption and compliance with all major regulatory standards.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section id="security" className="relative scroll-mt-28 py-20 px-4">
        <div className="max-w-6xl mx-auto grid gap-10 lg:grid-cols-2 items-center">
          <div className="space-y-3">
            <h2 className="text-3xl md:text-4xl font-extrabold">Secure by design</h2>
            <p className="text-slate-300">
              Your data stays on your device for this demo version (local storage). The UI is built with best practices so it’s easy to extend to a real backend later.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="font-semibold">Local-first</p>
              <p className="mt-1 text-sm text-slate-300">Runs without a server; great for prototyping.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="font-semibold">Theme controls</p>
              <p className="mt-1 text-sm text-slate-300">Built-in dark/light mode toggle.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="font-semibold">Protected routes</p>
              <p className="mt-1 text-sm text-slate-300">Dashboard routes require authentication.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="font-semibold">Extensible</p>
              <p className="mt-1 text-sm text-slate-300">Swap auth/storage with APIs when ready.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="relative scroll-mt-28 py-20 px-4">
        <div className="max-w-3xl mx-auto rounded-3xl border border-white/10 bg-white/5 p-6 md:p-10 backdrop-blur">
          <h2 className="text-3xl font-extrabold">Request a demo</h2>
          <p className="mt-2 text-slate-300">Fill this out and your email client will open with a pre-filled demo request.</p>

          <form onSubmit={submitDemo} className="mt-6 grid gap-3">
            <div className="grid gap-3 md:grid-cols-2">
              <input
                className="w-full rounded-xl border border-white/10 bg-slate-950/30 p-3 text-white placeholder:text-slate-400"
                placeholder="Full name"
                required
                value={demoForm.name}
                onChange={(e) => setDemoForm((p) => ({ ...p, name: e.target.value }))}
              />
              <input
                className="w-full rounded-xl border border-white/10 bg-slate-950/30 p-3 text-white placeholder:text-slate-400"
                type="email"
                placeholder="Email"
                required
                value={demoForm.email}
                onChange={(e) => setDemoForm((p) => ({ ...p, email: e.target.value }))}
              />
            </div>
            <input
              className="w-full rounded-xl border border-white/10 bg-slate-950/30 p-3 text-white placeholder:text-slate-400"
              placeholder="Company (optional)"
              value={demoForm.company}
              onChange={(e) => setDemoForm((p) => ({ ...p, company: e.target.value }))}
            />
            <textarea
              className="w-full rounded-xl border border-white/10 bg-slate-950/30 p-3 text-white placeholder:text-slate-400"
              placeholder="What do you want to track / solve?"
              rows={4}
              value={demoForm.message}
              onChange={(e) => setDemoForm((p) => ({ ...p, message: e.target.value }))}
            />
            {demoStatus ? <p className="text-sm text-emerald-300">{demoStatus}</p> : null}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/40"
              >
                Prepare demo email
              </button>
              <button
                type="button"
                onClick={() => goToAuth('signup')}
                className="px-6 py-3 border border-white/10 rounded-lg font-semibold hover:bg-white/10"
              >
                Or start using the dashboard
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Styles for animations */}
      <style>{
        `
          @keyframes blob {
            0%, 100% { transform: translate(0, 0) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
          }
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
          .animate-blob {
            animation: blob 7s infinite;
          }
          .animation-delay-2000 {
            animation-delay: 2s;
          }
          .animation-delay-4000 {
            animation-delay: 4s;
          }
          .animation-delay-1000 {
            animation-delay: 1s;
          }
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
        `
      }</style>
    </div>
  )
}
