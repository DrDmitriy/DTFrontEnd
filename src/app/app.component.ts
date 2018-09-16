import {Component, Output} from '@angular/core';
import {HttpService} from "./common/http.service";
import {EntranceComponent} from "./entrance/entrance.component";
import {EntriesComponent} from "./entrance/entries/entries.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  constructor(){
  }
}
