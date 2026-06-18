import type { DailyForecast } from "../types/daily-forecast"
import { Card, CardHeader, CardTitle, CardAction, CardContent } from "./ui/card"
import { ForecastDayDrawer } from "./ForecastDayDrawer"
import { cn } from "../lib/utils"

type ActionStatus = "GO" | "CAUTION" | "NO-GO"

function getActionStatus(
  minVisibility: number | null,
  maxWindSpeed: number | null,
  totalPrecipitation: number,
  maxWaveHeight: number | null
): ActionStatus {
  if ((maxWindSpeed != null && maxWindSpeed >= 20) || (maxWaveHeight != null && maxWaveHeight > 4) || totalPrecipitation > 1 || (minVisibility != null && minVisibility < 2)) return "NO-GO"
  if ((maxWindSpeed != null && maxWindSpeed >= 15) || (minVisibility != null && minVisibility < 5)) return "CAUTION"
  return "GO"
}

const statusBadge: Record<ActionStatus, string> = {
  GO: "bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-400 ring-1 ring-green-300 dark:ring-green-700",
  CAUTION:
    "bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-400 ring-1 ring-amber-300 dark:ring-amber-700",
  "NO-GO": "bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-400 ring-1 ring-red-300 dark:ring-red-700",
}

const cardStyles: Record<ActionStatus, string> = {
  GO: "bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 ring-green-400/50",
  CAUTION: "bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-800 ring-orange-400/50",
  "NO-GO": "bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 ring-red-400/50",
}

function visibilityStyle(v: number | null) {
  if (v == null) return "text-muted-foreground"
  return v < 2 ? "text-red-600 dark:text-red-400" : v < 5 ? "text-amber-600 dark:text-amber-400" : "text-green-600 dark:text-green-400"
}
function windStyle(w: number | null) {
  if (w == null) return "text-muted-foreground"
  return w >= 20 ? "text-red-600 dark:text-red-400" : w >= 15 ? "text-amber-600 dark:text-amber-400" : "text-green-600 dark:text-green-400"
}
function precipStyle(p: number) {
  return p > 1 ? "text-red-600 dark:text-red-400" : "text-green-600 dark:text-green-400"
}
function waveStyle(w: number | null) {
  if (w == null) return "text-muted-foreground"
  return w > 4 ? "text-red-600 dark:text-red-400" : "text-green-600 dark:text-green-400"
}

interface Props {
  entries: DailyForecast[]
}

export function ForecastDayCard({ entries }: Props) {
  const visibilities = entries.map((e) => e.visibility).filter((v): v is number => v != null)
  const minVisibility = visibilities.length > 0 ? Math.min(...visibilities) : null
  const windSpeeds = entries.map((e) => e.wind_speed_10m).filter((w): w is number => w != null)
  const maxWindSpeed = windSpeeds.length > 0 ? Math.max(...windSpeeds) : null
  const totalPrecipitation = entries.reduce((sum, e) => sum + (e.precipitation ?? 0), 0)
  const waveHeights = entries.map((e) => e.wave_height).filter((h): h is number => h != null)
  const maxWaveHeight = waveHeights.length > 0 ? Math.max(...waveHeights) : null

  const { units } = entries[0]
  const day = new Date(entries[0].time).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  })
  const status = getActionStatus(minVisibility, maxWindSpeed, totalPrecipitation, maxWaveHeight)
  const card = (
    <Card className={cn("cursor-pointer", cardStyles[status])}>
      <CardHeader>
        <CardTitle className="text-foreground dark:text-muted-foreground">{day}</CardTitle>
        <CardAction>
          <span
            className={cn(
              "inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold",
              statusBadge[status]
            )}
          >
            {status}
          </span>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="divide-y divide-border">
          <div className="flex items-center justify-between py-1.5">
            <span className="text-foreground dark:text-muted-foreground">Visibility</span>
            <span className={cn("font-medium", visibilityStyle(minVisibility))}>
              {minVisibility != null ? `${minVisibility.toFixed(2)} ${units.visibility}` : "N/A"}
            </span>
          </div>
          <div className="flex items-center justify-between py-1.5">
            <span className="text-foreground dark:text-muted-foreground">Wind</span>
            <span className={cn("font-medium", windStyle(maxWindSpeed))}>
              {maxWindSpeed != null ? `${maxWindSpeed} ${units.wind_speed_10m}` : "N/A"}
            </span>
          </div>
          <div className="flex items-center justify-between py-1.5">
            <span className="text-foreground dark:text-muted-foreground">Precipitation</span>
            <span className={cn("font-medium", precipStyle(totalPrecipitation))}>
              {totalPrecipitation.toFixed(2)} {units.precipitation}
            </span>
          </div>
          <div className="flex items-center justify-between py-1.5">
            <span className="text-foreground dark:text-muted-foreground">Waves</span>
            <span className={cn("font-medium", waveStyle(maxWaveHeight))}>
              {maxWaveHeight != null ? `${maxWaveHeight.toFixed(2)} ${units.wave_height}` : "N/A"}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return <ForecastDayDrawer day={day} entries={entries} units={units} trigger={card} />
}
