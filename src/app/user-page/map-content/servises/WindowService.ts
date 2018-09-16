import {AgmInfoWindow, AgmMarker, InfoWindowManager} from '@agm/core';
import {InfoWindowOptions} from '@agm/core/services/google-maps-types';
import {ElementRef} from '@angular/core';
import {MarkerRoute} from '../classes/MarkerRoute';
import {PolylineService} from './PolylineService';

export class WindowService {
  allInfoWindow: Array<AgmInfoWindow> = new Array<AgmInfoWindow>();
    public  addInfoWindowOnMap(manager: InfoWindowManager, option: InfoWindowOptions) {
    let infoWindow: AgmInfoWindow = new AgmInfoWindow(manager, new ElementRef(null));
    manager.addInfoWindow(infoWindow);
    manager.setOptions(infoWindow, option);
    return infoWindow;
  }

 public  openInfoWIndows(windows: AgmInfoWindow) {
    this.closeAllInfoWindows();
    windows.open();
    }


   public  closeAllInfoWindows() {
    this.allInfoWindow.map((infoWin) => infoWin.close());
  }
  public getAllInfoWindows() {
    return this.allInfoWindow;
  }
  public addInfoWindow(infoWindow: AgmInfoWindow) {
      this.allInfoWindow.push(infoWindow);
  }
}
