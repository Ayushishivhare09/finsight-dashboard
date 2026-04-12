import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts"

const COLORS = ["#8B5CF6", "#F59E0B", "#EC4899", "#3B82F6", "#22D3EE"]

export default function ExpenseBreakdown({ data }) {

  const total = data.reduce((acc, item) => acc + item.value, 0)

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900">
      
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-slate-800 dark:text-slate-100">
          Expense Breakdown
        </h3>

        <span className="text-sm text-slate-500">
          This month
        </span>
      </div>

      <div className="flex items-center gap-6">

        <div className="relative w-[160px] h-[160px]">

          <ResponsiveContainer width="100%" height="100%">
            <PieChart>

              <Pie
                isAnimationActive={true}
                animationDuration={800}
                data={data}
                dataKey="value"
                innerRadius={55}
                outerRadius={75}
                paddingAngle={4}
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip />

            </PieChart>
          </ResponsiveContainer>

          {/* CENTER TEXT */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-slate-800 dark:text-white">
              {data.length}
            </span>
            <span className="text-xs text-slate-500">
              cats
            </span>
          </div>

        </div>

        {/* LEGEND */}
        <div className="flex flex-col gap-2 text-sm">

          {data.map((item, index) => {

            const percent = Math.round((item.value / total) * 100)

            return (
              <div
                key={item.name}
                className="flex items-center justify-between gap-4"
              >

                <div className="flex items-center gap-2">

                  <span
                    className="w-3 h-3 rounded"
                    style={{ background: COLORS[index] }}
                  />

                  <span className="text-slate-600 dark:text-slate-300">
                    {item.name}
                  </span>

                </div>

                <span className="text-slate-500">
                  {percent}%
                </span>

              </div>
            )

          })}

        </div>

      </div>

    </div>
  )
}