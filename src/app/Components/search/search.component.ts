import { Component, NgModule, OnInit } from '@angular/core';
import { WheatherService } from '../../Services/wheather.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-search',
  imports: [FormsModule, CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent implements OnInit {
  constructor(public weatherservice: WheatherService) {
   
  }

  ngOnInit(): void {
  
  }
  

  searchCity: string = '';

  logsout(value: string): any {
    // console.log(value);
  }


  clearInput(): void {
    this.searchCity = '';
    this.weatherservice.searchResults = [];
  }
  onKeypress(Event : KeyboardEvent): void {
    this.weatherservice.searchResultFun(this.searchCity);
  }
  selectLocation(latitude: number, longitude: number): void {
    this.weatherservice.selectLocation(latitude, longitude);
  }
}
