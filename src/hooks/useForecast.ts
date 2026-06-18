import { useQuery } from "@tanstack/react-query"
import { useMemo } from "react"
import type { WeatherForecast } from "../types/weather-forecast"
import type { MarineForecast } from "../types/marine-forecast"
import type { DailyForecast } from "../types/daily-forecast"

export function useForecast() {
  const weather = useQuery<WeatherForecast>({
    queryKey: ["weather"],
    queryFn: () =>
      fetch(
        "https://api.open-meteo.com/v1/forecast?latitude=30.3674&longitude=-89.0928&hourly=visibility,wind_speed_10m,precipitation&timezone=auto&forecast_days=10&wind_speed_unit=kn&precipitation_unit=inch"
      ).then((res) => res.json()),
  })

  const marine = useQuery<MarineForecast>({
    queryKey: ["marine"],
    queryFn: () =>
      fetch(
        "https://marine-api.open-meteo.com/v1/marine?latitude=30.3674&longitude=-89.0928&hourly=wave_height&timezone=auto&forecast_days=10&length_unit=imperial"
      ).then((res) => res.json()),
  })

  const forecast = useMemo<DailyForecast[]>(() => {
    if (!weather.data || !marine.data) return []
    return weather.data.hourly.time.map((time, i) => ({
      time,
      visibility: weather.data!.hourly.visibility[i] / 6076, // nautical miles convertion
      wind_speed_10m: weather.data!.hourly.wind_speed_10m[i],
      precipitation: weather.data!.hourly.precipitation[i],
      wave_height: marine.data!.hourly.wave_height[i],
      units: {
        visibility: "nm",
        wind_speed_10m: weather.data!.hourly_units.wind_speed_10m,
        precipitation: weather.data!.hourly_units.precipitation,
        wave_height: marine.data!.hourly_units.wave_height,
      },
    }))
  }, [weather.data, marine.data])

  return {
    forecast,
    isPending: weather.isPending || marine.isPending,
    error: weather.error ?? marine.error,
    timezone: weather.data?.timezone,
  }
}
