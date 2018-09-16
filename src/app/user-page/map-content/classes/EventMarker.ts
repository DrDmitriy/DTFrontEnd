import {MapEvent} from './MapEvent';
import {AgmMarker} from '@agm/core';

export interface EventMarker {
  event: MapEvent;
  marker: AgmMarker;
}
