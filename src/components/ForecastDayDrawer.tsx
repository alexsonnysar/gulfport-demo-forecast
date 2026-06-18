import type { DailyForecast, DailyForecastUnits } from "../types/daily-forecast"
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle } from "./ui/drawer"

const defaultText = "text-foreground dark:text-muted-foreground"

function visibilityStyle(v: number) {
  return v < 2 ? "text-red-600 dark:text-red-400" : v < 5 ? "text-amber-600 dark:text-amber-400" : defaultText
}
function windStyle(w: number) {
  return w >= 20 ? "text-red-600 dark:text-red-400" : w >= 15 ? "text-amber-600 dark:text-amber-400" : defaultText
}
function precipStyle(p: number) {
  return p > 1 ? "text-red-600 dark:text-red-400" : defaultText
}
function waveStyle(w: number) {
  return w > 4 ? "text-red-600 dark:text-red-400" : defaultText
}
function rowBg(entry: DailyForecast) {
  if (entry.wind_speed_10m >= 20 || entry.wave_height > 4 || entry.precipitation > 1 || entry.visibility < 2)
    return "bg-red-100 dark:bg-red-950/70"
  if (entry.wind_speed_10m >= 15 || entry.visibility < 5) return "bg-amber-100 dark:bg-amber-950/70"
  return "bg-green-100 dark:bg-green-950/70"
}

interface Props {
  day: string
  entries: DailyForecast[]
  units: DailyForecastUnits
  trigger: React.ReactNode
}

export function ForecastDayDrawer({ day, entries, units, trigger }: Props) {
  return (
    <Drawer>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{day} — Hourly Forecast</DrawerTitle>
        </DrawerHeader>
        <div className="overflow-y-auto px-4 pb-6">
          <table className="w-full border-separate border-spacing-y-1 text-sm">
            <thead>
              <tr className="text-foreground/50">
                <th className="pb-2 pl-3 text-left font-medium">Time</th>
                <th className="px-3 pb-2 text-center font-medium">Visibility ({units.visibility})</th>
                <th className="px-3 pb-2 text-center font-medium">Wind ({units.wind_speed_10m})</th>
                <th className="px-3 pb-2 text-center font-medium">Precip ({units.precipitation.substring(0, 2)})</th>
                <th className="px-3 pb-2 text-center font-medium">Waves ({units.wave_height})</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr key={entry.time} className={rowBg(entry)}>
                  <td className="rounded-l-lg py-1.5 pl-3 text-left text-foreground dark:text-muted-foreground">
                    {entry.time.split("T")[1]}
                  </td>
                  <td className={`px-3 py-1.5 text-center font-medium ${visibilityStyle(entry.visibility)}`}>
                    {entry.visibility != null ? entry.visibility.toFixed(2) : "N/A"}
                  </td>
                  <td className={`px-3 py-1.5 text-center font-medium ${windStyle(entry.wind_speed_10m)}`}>
                    {entry.wind_speed_10m ?? "N/A"}
                  </td>
                  <td className={`px-3 py-1.5 text-center font-medium ${precipStyle(entry.precipitation)}`}>
                    {entry.precipitation != null ? entry.precipitation.toFixed(2) : "N/A"}
                  </td>
                  <td className={`rounded-r-lg px-3 py-1.5 text-center font-medium ${waveStyle(entry.wave_height)}`}>
                    {entry.wave_height != null ? entry.wave_height.toFixed(2) : "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
