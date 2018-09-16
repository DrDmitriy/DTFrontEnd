import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MapEvent} from '../map-content/classes/MapEvent';
import {Category} from '../map-content/classes/Category';
import {EventService} from '../map-content/servises/EventService';
import {CategoryService} from '../map-content/servises/CategoryService';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-event-constructor',
  templateUrl: './event-constructor.component.html',
  styleUrls: ['./event-constructor.component.css']
})

export class EventConstructorComponent implements OnInit {
  userId: number;
  eventName: string;
  eventDescription: string;
  selectedLat: number;
  selectedLng: number;
  location: String;
  startEvent: number;
  endEvent: number;
  display = false;
  categoryArray: Category[] = [];
  selectedCategory: Category[];
  currentDate = new Date();

  @Output() pressEventButton = new EventEmitter<MapEvent>();
  categoryService: CategoryService;

  constructor(private eventService: EventService, private service: CategoryService) {
    this.categoryService = service;
  }

  showDialog() {
    this.display = true;
  }

  ngOnInit() {
    this.categoryService.httpGetCategories()
      .subscribe(value => value.forEach(category =>
        this.categoryArray.push(category)));


    this.userId = 27;

  }

  public setLatLng(lat: number, lng: number): void {
    this.selectedLat = lat;
    this.selectedLng = lng;
  }

  addEvent(): void {
    let mapEvent = new MapEvent(this.eventName, this.eventDescription,
      this.selectedLat, this.selectedLng, this.location, this.startEvent, this.endEvent, this.selectedCategory);

    this.eventService.addMapEvent(mapEvent).subscribe();
    this.eventService.addEvent(mapEvent);
    this.pressEventButton.emit(mapEvent);
    this.display = false;
    this.clear();
  }

  cancel() {
    this.display = false;
    this.pressEventButton.emit();
  }

  clear() {
    this.eventName = '';
    this.eventDescription = '';
    this.location = '';
    this.selectedCategory = null;
    this.startEvent = null;
    this.endEvent = null;

  }
}
