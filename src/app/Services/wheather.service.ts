import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { LocationResponse } from '../Model/locationResponse';
import { weatherResponse } from '../Model/wheather';
import { TemperatureDetails } from '../Model/TemparatureDetails';
import { Aircondition } from '../Model/AirConditions';
import { TodaysForcast } from '../Model/TodaysForcast';
import { weekdata } from '../Model/WeekData';
import { count, Observable } from 'rxjs';
import { Environment } from '../Environment/Environment';
import { LocationResponse } from '../Model/locationResponse';
import { LocationfromText } from '../Model/Locationfromtext';

@Injectable({
  providedIn: 'root',
})
export class WheatherService {
  cityName: string = 'malappuram';
  language: string = 'en-US';
  Latitude: number = 11.0;
  Longitude: number = 76.125;

  // filled by api
  locationResponse?: LocationResponse;
  wheatherData?: weatherResponse;
  // filled by exarcting data from wheatherData
  temperatureDetails: TemperatureDetails = new TemperatureDetails();
  AirCondition?: Aircondition = new Aircondition();
  TodayForcast: TodaysForcast[] = [];
  WeekData: weekdata[] = [];
  // Get current date in YYYY-MM-DD format
  currentDate: string = Date.now().toString();
  SearchResult: LocationfromText;

  weatherCodeMap = new Map([
    [0, 'Clear sky'],
    [1, 'Mainly clear'],
    [2, 'Partly cloudy'],
    [3, 'Overcast'],
    [45, 'Fog'],
    [48, 'Depositing rime fog'],
    [51, 'Light drizzle'],
    [53, 'Moderate drizzle'],
    [55, 'Dense drizzle'],
    [56, 'Light freezing drizzle'],
    [57, 'Dense freezing drizzle'],
    [61, 'Slight rain'],
    [63, 'Moderate rain'],
    [65, 'Heavy rain'],
    [66, 'Light freezing rain'],
    [67, 'Heavy freezing rain'],
    [71, 'Slight snowfall'],
    [73, 'Moderate snowfall'],
    [75, 'Heavy snowfall'],
    [77, 'Snow grains'],
    [80, 'Slight rain showers'],
    [81, 'Moderate rain showers'],
    [82, 'Violent rain showers'],
    [85, 'Slight snow showers'],
    [86, 'Heavy snow showers'],
    [95, 'Thunderstorm'],
    [96, 'Thunderstorm with slight hail'],
    [99, 'Thunderstorm with heavy hail'],
  ]);

  constructor(private HttpClient: HttpClient) {
    this.getData();
  }
  getData(longitude?: number, latitude?: number): void {
    this.getWeatherData(longitude, latitude).subscribe({
      next: (data) => {
        this.wheatherData = data;
      },
      error: (error) => {
        console.error('Error fetching weather data:', error);
      },
      complete: () => {
        this.getLocationData(
          this.wheatherData?.latitude,
          this.wheatherData?.longitude
        ).subscribe({
          next: (data) => {
            this.locationResponse = data;
          },
          error: (error) => {
            console.error('Error fetching location data:', error);
          },
          complete: () => {
            this.proccessData();
          },
        });
      },
    });
  }

  getsummaryPhrase(code: number): string {
    return this.weatherCodeMap.get(code) || 'Unknown weather code';
  }

  getLocationData(
    latitude: number,
    longitude: number
  ): Observable<LocationResponse> {
    return this.HttpClient.get<LocationResponse>(
      'https://api.geoapify.com/v1/geocode/reverse',
      {
        params: {
          lat: latitude.toString(),
          lon: longitude.toString(),
          apiKey: 'f909ad08320f4d7a9ed73ba6cc01c382',
        },
      }
    );
  }

  getLocationfromText(text: string): Observable<LocationfromText> {
    return this.HttpClient.get<LocationfromText>(
      'https://geocoding-api.open-meteo.com/v1/search',
      {
        params: {
          language: 'en',
          format: 'json',
          name: text,
          count: '1',
        },
      }
    );
  }
  searchResultFun(text: string): void {
    this.getLocationfromText(text).subscribe({
      next: (data) => {
        this.SearchResult = data;
        console.log(this.SearchResult);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        this.getData(
          this.SearchResult.results[0]?.latitude,
          this.SearchResult.results[0]?.longitude
        );
      },
    });
  }

  getWeatherData(
    latitude?: number,
    longitude?: number
  ): Observable<weatherResponse> {
    return this.HttpClient.get<weatherResponse>(
      'https://api.open-meteo.com/v1/forecast',
      {
        params: {
          latitude: latitude ? latitude : this.Latitude,
          longitude: longitude ? longitude : this.Longitude,
          daily:
            'uv_index_max,temperature_2m_max,temperature_2m_min,weather_code',
          hourly: 'temperature_2m,weather_code',
          current:
            'temperature_2m,weather_code,is_day,apparent_temperature,relative_humidity_2m,precipitation,wind_speed_10m,rain',
        },
      }
    );
  }
  getSumaryImage(summary: string): string {
    var Cloudy = './partlyCloudy.png';
    var Rainy = './rain.png';
    var Sunny = './sun.png';
    var windy = './windy.png';
    var storm = './storm.png';
    if (
      summary.includes('Cloudy') ||
      summary.includes('Partly') ||
      summary.includes('Fair')
    ) {
      return Cloudy;
    } else if (summary.includes('rain') || summary.includes('showers')) {
      return Rainy;
    } else if (summary.includes('Sunny') || summary.includes('Clear')) {
      return Sunny;
    } else if (summary.includes('Fog') || summary.includes('Haze')) {
      return windy;
    } else if (summary.includes('Thunderstorm') || summary.includes('storm')) {
      return storm;
    }

    return Sunny;
  }

  fillTemperatureDetails() {
    console.log('Processing data...');
    if (this.wheatherData) {
      this.temperatureDetails.temperature =
        this.wheatherData?.current.temperature_2m;
      this.temperatureDetails.Rain = this.wheatherData?.current.precipitation;
      this.temperatureDetails.Location =
        this.locationResponse?.features[0].properties.city;
      this.temperatureDetails.summary = this.getsummaryPhrase(
        this.wheatherData?.current.weather_code
      );
      this.temperatureDetails.image = this.getSumaryImage(
        this.temperatureDetails.summary
      );
    }
  }
  fillweekdetails() {
    var weekcount = 0;

    while (weekcount < 7) {
      this.WeekData.push(new weekdata());
      this.WeekData[weekcount].day = new Date(
        this.wheatherData?.daily.time[weekcount]
      ).toLocaleDateString('en-US', { weekday: 'long' });
      this.WeekData[weekcount].high_temperature =
        this.wheatherData?.daily.temperature_2m_max[weekcount];
      this.WeekData[weekcount].low_temperature =
        this.wheatherData?.daily.temperature_2m_min[weekcount];
      this.WeekData[weekcount].summury = this.getsummaryPhrase(
        this.wheatherData?.daily.weather_code[weekcount]
      );
      this.WeekData[weekcount].image = this.getSumaryImage(
        this.WeekData[weekcount].summury
      );
      weekcount++;
    }
  }
  fillTodaysForcast() {
    // Get current hour
    const currentHour = new Date().getHours();

    var todaycount = 0;

    while (todaycount < 6) {
      this.TodayForcast.push(new TodaysForcast());

      // Get temperature from the hourly data starting from current hour
      this.TodayForcast[todaycount].temperature =
        this.wheatherData?.hourly.temperature_2m[currentHour + todaycount];

      // Get time and format it
      const forecastTime = new Date(
        this.wheatherData?.hourly.time[currentHour + todaycount] || ''
      );
      this.TodayForcast[todaycount].time = forecastTime.toLocaleTimeString(
        'en-US',
        {
          hour: '2-digit',
          minute: '2-digit',
        }
      );

      // Get weather code and convert to summary
      const weatherCode =
        this.wheatherData?.hourly.weather_code[currentHour + todaycount];
      const summary = this.getsummaryPhrase(weatherCode || 0);

      // Get corresponding image
      this.TodayForcast[todaycount].image = this.getSumaryImage(summary);

      todaycount++;
    }
  }

  AirConditionDetails() {
    this.AirCondition.Rain = this.wheatherData?.current.precipitation;
    this.AirCondition.humidity =
      this.wheatherData?.current.relative_humidity_2m;
    this.AirCondition.uvindex = Math.max(
      ...this.wheatherData?.daily.uv_index_max
    );
    this.AirCondition.wind = this.wheatherData?.current.wind_speed_10m;
  }

  proccessData(): void {
    this.fillTemperatureDetails();
    this.fillweekdetails();
    this.fillTodaysForcast();
    this.AirConditionDetails();
  }
}
