export interface DailyForecastUnits {
  visibility: string
  wind_speed_10m: string
  precipitation: string
  wave_height: string
}

export interface DailyForecast {
  time: string
  visibility: number
  wind_speed_10m: number
  precipitation: number
  wave_height: number
  units: DailyForecastUnits
}
