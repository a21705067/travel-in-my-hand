import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {LoadingController} from '@ionic/angular';
import {RouterModule, Router} from '@angular/router';
import {FireAuthService} from '../services/fire-auth.service';

declare var google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {

  map: any;

  @ViewChild('map', {read: ElementRef, static: false}) mapRef: ElementRef;

  infoWindows: any = [];
  markers: any = [
    {
        title: "Universidade Lusófona",
        latitude: "38.7564266",
        longitude: "-9.1533085"
    }
  ];

  addMarkersToMap(markers) {
    for (let marker of markers) {
        let position = new google.maps.LatLng(marker.latitude, marker.longitude);
        let mapMarker = new google.maps.Marker({
            position: position,
            title: marker.title,
            latitude: marker.latitude,
            longitude: marker.longitude
        });

        mapMarker.setMap(this.map);
        this.addInfoWindowToMarker(mapMarker);
    }
  }

  addInfoWindowToMarker(marker) {
    let infoWindowContent = '<div id="content">' +
                              '<h2 id="firstHeading" class"firstHeading">' + marker.title + '</h2>' +
                              '<p>Latitude: ' + marker.latitude + '</p>' +
                              '<p>Longitude: ' + marker.longitude + '</p>' +
                              '<ion-button id="navigate">Navigate</ion-button>' +
                            '</div>';

    let infoWindow = new google.maps.infoWindow({
      content: infoWindowContent
    });

    marker.addListener('click', () => {
        this.closeAllInfoWindows();
        infoWindow.open(this.map, marker);

        google.maps.event.addListenerOnce(infoWindow, 'domready', () => {
            document.getElementById('navigate').addEventListener('click', () => {
             console.log('navigate button clicked!');
             window.open('https://www.google.com/maps/dir?api=1&destination=' + marker.latitude + ',' + marker.longitude);
            });
        });
    });
    this.infoWindows.push(infoWindow);
  }

  closeAllInfoWindows() {
    for(let window of this.infoWindows) {
        window.close();
    }
  }

  constructor(public authService: FireAuthService, public router: Router, public loadingController: LoadingController) {
  }

  ionViewDidEnter(){
    this.showMap();
  }

  showMap() {
    const location = new google.maps.LatLng(38.7436883, -9.1952226);
    const options = {
        center: location,
        zoom: 15,
        disableDefaultUI: true
    }
    this.map = new google.maps.Map(this.mapRef.nativeElement, options);
    this.addMarkersToMap(this.markers);
  }

  public ngOnInit(): void {
  }

    public logout(): void {
        this.authService.doLogout().then(() => this.router.navigate(['/login']), err => console.log(err));
    }

    public async loading(): Promise<void> {
        const loading = await this.loadingController.create({message: 'Loading', translucent: true, spinner: 'circles'});
        loading.present();
    }

    public profile(): void {
        this.router.navigate(['/profile']);
    }

    public travels(): void {
        this.router.navigate(['/mytravels']);
    }

    public maps(): void {
        this.router.navigate(['/map']);
    }

    public search(): void {
        this.router.navigate(['/search']);
    }

    public camera(): void {
        this.router.navigate(['/camera']);
    }

    public home(): void {
        this.router.navigate(['/home']);
    }

}
