interface HourlyUnits {
  time: string
  wave_height: string
}

interface Hourly {
  time: string[]
  wave_height: number[]
}

export interface MarineForecast {
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
