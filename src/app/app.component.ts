import {Component, OnInit} from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private afAuth: AngularFireAuth
  ) {
    this.initializeApp();
  }

  pages = [
    {
      title: 'Home',
      url: './home',
      icon: 'home'
    },
    {
      title: 'Profile',
      url: './profile',
      icon: 'person'
    },
    {
      title: 'My Travels',
      children: [
        {
          title: 'Planned',
          url: './planned',
          icon: 'airplane'
        },
        {
          title: 'New Travel',
          url: './newtravel',
          icon: 'compass'
        },
        {
          title: 'Journal',
          url: './journal',
          icon: 'book'
        },
        {
          title: 'Past Travels',
          url: './pasttravel',
          icon: 'globe'
        }
      ]
    },
    {
      title: 'Map',
      url: './map',
      icon: 'map'
    },
    {
      title: 'Search',
      url: './search',
      icon: 'search'
    },
    {
      title: 'Settings',
      url: './settings',
      icon: 'settings'
    }
  ]

  initializeApp() {
    this.platform.ready().then(() => {
      this.afAuth.user.subscribe(user => {
        if (user) {
          this.router.navigate(['/home']);
        } else {
          this.router.navigate(['/login']);
        }
      }, err => {
        this.router.navigate(['/login']);
      }, () => {
        this.splashScreen.hide();
      });
      this.statusBar.styleDefault();
    });
  }
}
