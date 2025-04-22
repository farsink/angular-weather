import { Component, OnInit } from '@angular/core';
import { HeroComponent } from '../hero/hero.component';
import { ForecastComponent } from '../forecast/forecast.component';
import { RightforecastComponent } from '../rightforecast/rightforecast.component';
import { AirComponent } from '../air/air.component';
import { WheatherService } from '../../Services/wheather.service';
import { TemperatureDetails } from '../../Model/TemparatureDetails';
import { TodaysForcast } from '../../Model/TodaysForcast';
import { weekdata } from '../../Model/WeekData';
import { Aircondition } from '../../Model/AirConditions';

@Component({
  selector: 'app-weather-main',
  imports: [
    HeroComponent,
    ForecastComponent,
    RightforecastComponent,
    AirComponent,
  ],
  templateUrl: './weather-main.component.html',
  styleUrl: './weather-main.component.scss',
})
export class WeatherMainComponent implements OnInit {
   temparatureDetails?: TemperatureDetails;
    todaysForcast?: TodaysForcast[];
    weekData?: weekdata[];
    AirCondition ?: Aircondition
  
    constructor(private WeatherService: WheatherService) {}
    ngOnInit(): void {
      this.temparatureDetails = this.WeatherService.temperatureDetails;
      this.todaysForcast = this.WeatherService.TodayForcast;
      this.weekData = this.WeatherService.WeekData;
      this.AirCondition = this.WeatherService.AirCondition;
      console.log(this.AirCondition);
      
    }
}
