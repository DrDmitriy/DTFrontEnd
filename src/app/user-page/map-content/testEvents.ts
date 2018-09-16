import {MapEvent} from './classes/MapEvent';
/*
let event1: MapEvent = new MapEvent('event1', 55.719410, 37.639358 );
let event2: MapEvent = new MapEvent('event2', 55.729310, 37.639258 );
let event3: MapEvent = new MapEvent('event3', 55.739110, 37.639158 );
*/

// export const EVENTS: Array<MapEvent> = [event1, event2, event3];
export const EVENTS: Array<MapEvent> = [];

export class TestEvents {
  public static addTestEvent(testEvent: MapEvent) {
    EVENTS.push(testEvent);
  }
}
