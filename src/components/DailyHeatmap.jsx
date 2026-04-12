const levelClass = {
  0: 'bg-gray-100 dark:bg-slate-800',
  1: 'bg-green-200 dark:bg-green-900',
  2: 'bg-green-300 dark:bg-green-700',
  3: 'bg-green-400 dark:bg-green-600',
  4: 'bg-green-500 dark:bg-green-500',
}


export default function DailyHeatmap({ weeks }) {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  return (
    <section className="rounded-2xl border border-slate-200 bg-white/95 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/85">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h3 className="font-semibold">Daily Expense Intensity</h3>
          <p className="text-xs text-slate-500">Calendar view of your spending pattern</p>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-slate-500">
          <span>Low</span>
          {[0, 1, 2, 3, 4].map((level) => (
            <span key={level} className={`h-3 w-3 rounded ${levelClass[level]}`} />
          ))}
          <span>High</span>
        </div>
      </div>
      <div className="overflow-x-auto">
        <div className="grid grid-cols-7 gap-3">
          {days.map((day) => (
            <div key={day} className="pb-1 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
              {day}
            </div>
          ))}
          {weeks.flat().map((cell) => {
            const muted = !cell.inCurrentMonth
            return (
              <div
                key={cell.date}
                title={`${cell.date} • ₹${Math.round(cell.amount)}`}
                className={`h-16 rounded-md border p-2 transition hover:scale-105 dark:border-slate-700 ${
                  muted ? 'bg-slate-50 dark:bg-slate-900/60' : levelClass[cell.level]
                }`}
              >
                <div className={`text-xs font-semibold ${muted ? 'text-slate-400' : 'text-slate-800 dark:text-slate-100'}`}>{cell.day}</div>
                <div className={`mt-3 text-[11px] ${muted ? 'text-slate-400' : 'text-slate-600 dark:text-slate-100/90'}`}>
                  {cell.amount > 0 ? `Rs ${Math.round(cell.amount)}` : ''}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
