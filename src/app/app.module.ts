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
    apiKey: "AIzaSyDuM8nsn9COpIrS3H54-zVym669DCtzir8",
        authDomain: "travelers-community-68172.firebaseapp.com",
        databaseURL: "https://travelers-community-68172-default-rtdb.europe-west1.firebasedatabase.app",
        projectId: "travelers-community-68172",
        storageBucket: "travelers-community-68172.appspot.com",
        messagingSenderId: "901698758803",
        appId: "1:901698758803:web:c1217634cae71141a88566",
        measurementId: "G-VXTYSRHXNP"
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
        AppRoutingModule
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
