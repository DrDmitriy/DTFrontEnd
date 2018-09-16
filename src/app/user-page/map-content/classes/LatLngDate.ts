import { LatLngLiteral} from '@agm/core';

export class LatLngDate implements LatLngLiteral {
  lat: number;
  lng: number;
  date: number;

 /* getLat(): number {
    return this.lat;
  }

  getLng(): number {
    return this.lng;
  }
  getDate(): number {
    return this.date;
  }*/
}
