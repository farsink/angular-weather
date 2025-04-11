import { Component, Input } from '@angular/core';
import { TodaysForcast } from '../../Model/TodaysForcast';

@Component({
  selector: 'app-forecast',
  imports: [],
  templateUrl: './forecast.component.html',
  styleUrl: './forecast.component.scss',
})
export class ForecastComponent {
  @Input() todaydata?: TodaysForcast[];
}
