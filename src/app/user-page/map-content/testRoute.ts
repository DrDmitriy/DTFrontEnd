import {LatLngDate} from './classes/LatLngDate';
import {Route } from './classes/Route';
import {Routes} from './classes/Routes';

const pointArray1: LatLngDate[] = [
{lat: 55.729910, lng: 37.639458, date: 1500000000000},
{lat: 55.730264, lng: 37.642829, date: 1500009000000},
];

const pointArray2: LatLngDate[] = [
{lat: 55.730173, lng: 37.643119, date: 1600000000000},
{lat: 55.790173, lng: 37.693119, date: 1600000200000},
];

const pointArray3: LatLngDate[] = [
{lat: 55.740173, lng: 37.693219, date: 160004000000},
{lat: 55.740173, lng: 37.699219, date: 160009000000},
];

const route1: Route = new Route(pointArray1);
const route2: Route = new Route(pointArray2);
const route3: Route = new Route(pointArray3);

export const ROUTES: Routes = {
  routes: [route1, route2, route3]
};
