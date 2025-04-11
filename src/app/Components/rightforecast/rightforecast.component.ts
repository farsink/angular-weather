import { Component, Input } from '@angular/core';
import { weekdata } from '../../Model/WeekData';

@Component({
  selector: 'app-rightforecast',
  imports: [],
  templateUrl: './rightforecast.component.html',
  styleUrl: './rightforecast.component.scss',
})
export class RightforecastComponent {
  @Input() weekdata?: weekdata[];
}
