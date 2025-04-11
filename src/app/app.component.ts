import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HomeComponent,],
  template: `
    <app-home />

    <router-outlet />
  `,
  styles: [],
})
export class AppComponent {}
