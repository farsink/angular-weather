import { Component, Input } from '@angular/core';
import { Aircondition } from '../../Model/AirConditions';

@Component({
  selector: 'app-air',
  imports: [],
  templateUrl: './air.component.html',
  styleUrl: './air.component.scss'
})
export class AirComponent {
 @Input() Airdata ?: Aircondition;
}
