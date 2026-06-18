interface HourlyUnits {
  time: string
  visibility: string
  wind_speed_10m: string
  precipitation: string
}

interface Hourly {
  time: string[]
  visibility: number[]
  wind_speed_10m: number[]
  precipitation: number[]
}

export interface WeatherForecast {
  latitude: number
  longitude: number
  generationtime_ms: number
  utc_offset_seconds: number
  timezone: string
  timezone_abbreviation: string
  elevation: number
  hourly_units: HourlyUnits
  hourly: Hourly
}
