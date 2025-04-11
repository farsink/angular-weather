import { Component } from '@angular/core';
import { WheatherService } from '../../Services/wheather.service';

@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent {
  constructor(public weatherService: WheatherService) {
    this.weatherService.getData();
  }
}
