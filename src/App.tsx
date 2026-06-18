import { useForecast } from "./hooks/useForecast"
import { ForecastDayCard } from "./components/ForecastDayCard"
import { ForecastDaySkeleton } from "./components/ForecastDaySkeleton"
import type { DailyForecast } from "./types/daily-forecast"

export function App() {
  const { forecast, isPending, error, timezone } = useForecast()

  if (error) return "An error has occurred: " + error.message

  if (isPending) {
    return (
      <div className="mx-auto w-full max-w-7xl px-8 py-8">
        <h1 className="mb-6">Gulfport Demo Forecast</h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-5">
          {Array.from({ length: 10 }).map((_, i) => (
            <ForecastDaySkeleton key={i} />
          ))}
        </div>
      </div>
    )
  }

  const byDay = forecast.reduce<Record<string, DailyForecast[]>>((acc, entry) => {
    const day = entry.time.split("T")[0]
    ;(acc[day] ??= []).push(entry)
    return acc
  }, {})

  return (
    <div className="mx-auto w-full max-w-7xl px-8 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1>Gulfport Demo Forecast</h1>
        <p className="text-muted-foreground">{timezone}</p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-5">
        {Object.entries(byDay).map(([day, entries]) => (
          <ForecastDayCard key={day} entries={entries} />
        ))}
      </div>
    </div>
  )
}

export default App
