import { Component } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private geolocation: Geolocation) {this.getLocation(); }
  loc;
  lat;
  long;
  getLocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.lat = resp.coords.latitude;
      this.long = resp.coords.longitude;
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

}
