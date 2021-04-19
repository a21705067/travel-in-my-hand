import { Component, OnInit, ViewChild } from '@angular/core';
import {PhotoService} from '../services/photo.service';
import {Router} from '@angular/router';
import {ParkDataService} from '../park-data.service';
import {Park} from '../park';
import {Map, marker, tileLayer, icon} from 'leaflet';
import {FireAuthService} from '../services/fire-auth.service';


const customIcon = icon({
  iconUrl: 'assets/marker-icon.png',
  shadowUrl: 'assets/marker-shadow.png',

  iconSize:     [38, 60], // size of the icon
  shadowSize:   [50, 64], // size of the shadow
  iconAnchor:   [15, 50], // point of the icon which will correspond to marker's location
  shadowAnchor: [4, 62],  // the same for the shadow
  popupAnchor:  [3, -30] // point from which the popup should open relative to the iconAnchor
});

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {

  /*
  @ViewChild('map', {static: true}) mapElement;
  map: GoogleMap;
   */

  public parkData: Array<Park>;
  @ViewChild('gmap') gmapElement: any;
  public map: Map;

  constructor(public authService: FireAuthService, public router: Router,
              private parkDataService: ParkDataService) {
  }

  public ngOnInit(): void {
  }

  public logout(): void {
    this.authService.doLogout().then(() => this.router.navigate(['/login']), err => console.log(err));
  }

  ionViewDidEnter() {
    // In setView add latLng and zoom
    this.map = new Map('mapId3').setView([38.7071, -9.13549], 10);
    tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}').addTo(this.map);
    this.parkDataService.load().subscribe((data) => {
      this.parkData = data;
      this.leafletMap();
    });
  }

  public leafletMap(): void {
    if (this.parkData) {
      for (const park of this.parkData) {
        marker([park.lat, park.long], {icon: customIcon}).addTo(this.map)
            .bindPopup(park.name + park.state)
            .openPopup()
            .on('click', () => {
              this.markerClickHandler(marker, park.id);
            });
      }
    }
  }

  public markerClickHandler(markerCurr: any, theparkID: number) {
    this.router.navigateByUrl(`tabs/map/detail/${theparkID}`);
  }

  ionViewWillLeave() {
    this.map.remove();
  }

  /*
  ionViewDidLoad() {
    this.loadMap();
  }

  loadMap() {

    Environment.setEnv({
      'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyAxjFMK1idLPoB2xxGVmSG-Z0fbrgCI-Ok',
      'API_KEY_FOR_BROWSER_DEBUG': ''
    });

    const mapOptions: GoogleMapOptions = {
        controls: {
          compass: true,
          myLocation: true,
          myLocationButton: true,
          mapToolbar: true
        }
    };

    this.map = GoogleMaps.create('map_canvas', mapOptions);
  }
   */
}
