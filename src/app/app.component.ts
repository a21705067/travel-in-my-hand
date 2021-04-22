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
      title: 'Profile',
      url: './profile',
      icon: 'person'
    },
    {
      title: 'Chat',
      url: './map',
      icon: 'chatbubbles'
    },
    {
      title: 'Matchmaking',
      url: './search',
      icon: 'people'
    },
    {
      title: 'Partners',
      url: './settings',
      icon: 'hand'
    },
    {
      title: 'Settings',
      url: './settings',
      icon: 'settings'
    },
    {
      title: 'Logout',
      url: './logout',
      icon: 'log-out'
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
