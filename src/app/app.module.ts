import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {Camera} from '@ionic-native/camera/ngx';
import {IonicStorageModule} from '@ionic/storage';
import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFireStorageModule} from '@angular/fire/storage';

export const firebaseConfig = {
    apiKey: 'AIzaSyAqeuMSOX8PJklOyTvxWdRDetuiTagohh0',
    authDomain: 'my-first-firebase-app-df746.firebaseapp.com',
    databaseURL: 'https://my-first-firebase-app-df746.firebaseio.com',
    projectId: 'my-first-firebase-app-df746',
    storageBucket: 'my-first-firebase-app-df746.appspot.com',
    messagingSenderId: '597760634689',
    appId: '1:597760634689:web:27a2c23c232c7f8cf37bc0',
    measurementId: 'G-C9NZ8FB313'
};

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
        IonicStorageModule.forRoot(),
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFireAuthModule,
        AngularFirestoreModule,
        AngularFireDatabaseModule,
        AngularFireStorageModule,
    ],
    providers: [
        StatusBar,
        SplashScreen,
        Camera,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
