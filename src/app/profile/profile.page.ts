import { Component, OnInit, ChangeDetectorRef, Injectable } from '@angular/core';
import { PhotoService } from '../services/photo.service';
import { FireAuthService } from '../services/fire-auth.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { RouterModule, Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { SuperTabs } from '@ionic-super-tabs/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})

export class ProfilePage implements OnInit {
  profile: boolean;

  userCollection: AngularFirestoreDocument
  userProfile
  userFriends
  fullName: string
  email: string
  happy: string
  notifications: boolean
  picture: string
  age: number
  nationality: string

  private unsubscribe: Subject<void> = new Subject<void>();


  constructor(public photoService: PhotoService, public authService: FireAuthService, public router: Router,
              public loadingController: LoadingController, private db: AngularFirestore, private changeRef: ChangeDetectorRef,
              private alertController: AlertController) {

               this.profile = true;

               this.userCollection = db.collection('utilizador').doc(this.authService.getUID());

               this.userProfile = this.userCollection.valueChanges().subscribe(dados => {
                    this.fullName = dados.fullName,
                    this.email = dados.email,
                    this.happy = dados.happy
                    this.notifications = dados.notifications,
                    this.picture = dados.picture,
                    this.age = dados.age,
                    this.nationality = dados.nationality
               });

               this.userCollection.collection('friends').valueChanges().subscribe(dados => (this.userFriends = dados));

  }

  ngOnInit() {
  }

  public logout(): void {
    this.authService.doLogout().then(() => this.router.navigate(['/login']), err => console.log(err));
  }

  public async loading(): Promise<void> {
    const loading = await this.loadingController.create({message: 'Loading', translucent: true, spinner: 'circles'});
    loading.present();
  }

  public removeFriend() {}

  public goEdit() {
    this.profile = false;
  }

  public goSave() {
    this.db.collection('utilizador').doc(this.authService.getUID()).update({
      happy: this.happy,
      age: this.age,
      nationality: this.nationality
    });

    this.profile = true;

    this.presentAlert();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Profile updated',
      buttons: ['Ok']
    });
    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

}
