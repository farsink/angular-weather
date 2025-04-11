import { Component, NgModule, OnInit } from '@angular/core';
import { WheatherService } from '../../Services/wheather.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-search',
  imports: [FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent implements OnInit {
  constructor(private weatherservice: WheatherService) {}

  ngOnInit(): void {}

  searchCity: string = '';

  logsout(value: string): any {
    // console.log(value);
  }

  onKeypress(event:KeyboardEvent):void{
    if(event.key === 'Enter'){
      this.weatherservice.searchResultFun(this.searchCity)
    }
  }
}
