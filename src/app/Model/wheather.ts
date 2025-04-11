export interface weatherResponse {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_units: CurrentUnits;
  current: Current;
  hourly_units: HourlyUnits;
  hourly: Hourly;
  daily_units: DailyUnits;
  daily: Daily;
}

export interface CurrentUnits {
  time: string;
  interval: string;
  temperature_2m: string;
  weather_code: string;
  is_day: string;
  apparent_temperature: string;
  relative_humidity_2m: string;
  precipitation: string;
  wind_speed_10m: string;
}

export interface Current {
  time: string;
  interval: number;
  temperature_2m: number;
  weather_code: number;
  is_day: number;
  apparent_temperature: number;
  relative_humidity_2m: number;
  precipitation: number;
  wind_speed_10m: number;
  rain: number;
}

export interface HourlyUnits {
  time: string;
  temperature_2m: string;
  weather_code: string;
}

export interface Hourly {
  time: string[];
  temperature_2m: number[];
  weather_code: number[];
}

export interface DailyUnits {
  time: string;
  uv_index_max: string;
  temperature_2m_max: string;
  temperature_2m_min: string;
  weather_code: string;
}

export interface Daily {
  time: string[];
  uv_index_max: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  weather_code: number[];
}
