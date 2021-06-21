import { Component, OnInit, ChangeDetectorRef, Injectable } from '@angular/core';
import { PhotoService } from '../services/photo.service';
import { FireAuthService } from '../services/fire-auth.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { RouterModule, Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})

export class ProfilePage implements OnInit {
  tabId: string = 'Settings';
  userCollection: AngularFirestoreDocument
  userProfile
  userFriends
  fullName: string
  email: string
  happy: string
  notifications: boolean
  picture: string

  private unsubscribe: Subject<void> = new Subject<void>();


  showTab (tabIdPageName) {
         this.tabId = tabIdPageName;
  }

  constructor(public photoService: PhotoService, public authService: FireAuthService, public router: Router,
              public loadingController: LoadingController, private db: AngularFirestore, private changeRef: ChangeDetectorRef,
              private alertController: AlertController) {

               this.userCollection = db.collection('utilizador').doc(this.authService.getUID());

               this.userProfile = this.userCollection.valueChanges().subscribe(dados => {
                    this.fullName = dados.fullName,
                    this.email = dados.email,
                    this.happy = dados.happy,
                    this.notifications = dados.notifications,
                    this.picture = dados.picture
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

}
