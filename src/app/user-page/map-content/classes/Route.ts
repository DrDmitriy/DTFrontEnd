import {LatLngDate} from './LatLngDate';

export class Route {
 // route: LatLngDate[];
  route: Array<LatLngDate>;
  distance: number;
  duration: string;
  constructor(pointArray: Array<LatLngDate>) {
    this.route = pointArray;
  }
}
