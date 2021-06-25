import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {PhotoService} from '../services/photo.service';
import {FireAuthService} from '../services/fire-auth.service';
import {LoadingController} from '@ionic/angular';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  userCollection: AngularFirestoreDocument;
  userSettings
  newsletter: boolean;
  gallery: boolean;
  notifications: boolean;
  camera: boolean;
  location: boolean;


  constructor(public photoService: PhotoService, public authService: FireAuthService, public router: Router,
              public loadingController: LoadingController, private db: AngularFirestore) {

              this.userCollection = db.collection('utilizador').doc(this.authService.getUID());

              this.userSettings = this.userCollection.valueChanges().subscribe(dados => {
                        this.newsletter = dados.newsletter,
                        this.gallery = dados.gallery,
                        this.notifications = dados.notifications,
                        this.camera = dados.camera,
                        this.location = dados.location
                    });
  }

  ngOnInit() {
  }

  public logout(): void {
    this.authService.doLogout().then(() => this.router.navigate(['/login']), err => console.log(err));
  }

  public async loading(): Promise<void> {
    const loading = await this.loadingController.create({message: 'Loading', translucent: true, spinner: 'circles'});
    await loading.present();
  }

  public updateProfile(value) {
    this.db.collection('utilizador').doc(this.authService.getUID()).update({
        notifications: this.notifications,
        newsletter: this.newsletter,
//         camera: this.camera,
        location: this.location,
        gallery: this.gallery
    });
  }
}
