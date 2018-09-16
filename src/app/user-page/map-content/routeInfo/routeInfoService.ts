import {Route} from '../classes/Route';
import {LatLngDate} from '../classes/LatLngDate';
import {GoogleMapsAPIWrapper} from '@agm/core';
declare const google: any;
export class RouteInfoService {
  constructor(public mapApiWrapper: GoogleMapsAPIWrapper) {}

  private countDistancePoints(latLngDateA: LatLngDate, latLngDateB: LatLngDate): Promise<number> {
    let googleMap = this.mapApiWrapper.getNativeMap();
    let promisN: Promise<number> =
      googleMap.then(() => {
        let latLngA = new google.maps.LatLng(latLngDateA.lat, latLngDateA.lng);
        let latLngB = new google.maps.LatLng(latLngDateB.lat, latLngDateB.lng);
        return (google.maps.geometry.spherical.computeDistanceBetween(latLngA, latLngB) / 1000);
      });
    return promisN;
  }

   async countDistance(route: Route) {
    let sumDistance = 0;
    for (let i = 0; i < route.route.length - 1; i++) {
      sumDistance += await this.countDistancePoints(route.route[i], route.route[i + 1]);
    }
    route.distance = sumDistance;
    return sumDistance;
  }

  countDuration(route: Route) {
    let durationStr = '';
    let millisekonds: number = route.route[route.route.length - 1].date - route.route[0].date;
    console.log('MIL ' + millisekonds);
    let minutes: number = millisekonds / 60000; // in one minutes 60_000 millisekons
    let hours = 0;
    if (minutes > 59) {
      hours = (millisekonds / 3600000);
      minutes = (millisekonds % 3600000) / 60000;
    }
    if (hours) {
      durationStr = hours.toFixed() + 'h.';
    }
    if (minutes) {
      durationStr += ' ' + minutes.toFixed(0) + 'min.';
    }
    route.duration = durationStr;
  }
}
