import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { SearchComponent } from '../Components/search/search.component';
import { HeroComponent } from '../Components/hero/hero.component';
import { ForecastComponent } from '../Components/forecast/forecast.component';
import { RightforecastComponent } from '../Components/rightforecast/rightforecast.component';
import { AirComponent } from '../Components/air/air.component';
import { WheatherService } from '../Services/wheather.service';
import { TemperatureDetails } from '../Model/TemparatureDetails';
import { TodaysForcast } from '../Model/TodaysForcast';
import { weekdata } from '../Model/WeekData';
import { Aircondition } from '../Model/AirConditions';
import { WeatherMainComponent } from "../Components/weather-main/weather-main.component";

@Component({
  selector: 'app-home',
  imports: [
    NavbarComponent,
    SearchComponent,
    HeroComponent,
    ForecastComponent,
    RightforecastComponent,
    AirComponent,
    WeatherMainComponent
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
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
