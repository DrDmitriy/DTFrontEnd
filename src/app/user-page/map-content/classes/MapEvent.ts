import {Category} from './Category';

export class MapEvent {
  userId: number;
  eventId: number;
  eventName: String;
  eventDescription: String;
  // category: String;
  categories: Array<Category>;
  latitude: number;
  longitude: number;
  location: String;
  startEvent: number;
  endEvent: number;
  status: string;

  constructor(eventName: String, eventDescription: String, latitude: number, longitude: number, location: String,
              startEvent: number, endEvent: number, status: string, categories: Array<Category> ) {
    this.eventName = eventName;
    this.eventDescription = eventDescription;
    this.latitude = latitude;
    this.longitude = longitude;
    this.location = location;
    this.startEvent = startEvent;
    this.endEvent = endEvent;
    this.categories = categories;
    this.status = status;

  }
  public setUserId(userId: number) {
    this.userId = userId;
  }
  public setEventId(eventId: number) {
    this.eventId = eventId;
  }

}
