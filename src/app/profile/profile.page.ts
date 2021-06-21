import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { PhotoService } from '../services/photo.service';
import { FireAuthService } from '../services/fire-auth.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { RouterModule, Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import {Observable, Subject} from 'rxjs';
import {switchMap, takeUntil} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {Friend} from '../models/friends';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})

export class ProfilePage implements OnInit {

  private unsubscribe: Subject<void> = new Subject<void>();
  user = this.authService.getUID();
  userFriends: Friend[];

  tabId: string = 'Settings';
  mainuser: AngularFirestoreDocument
  userProfile
  fullName: string
  email: string
  happy: string
  notifications: boolean
  picture: string


  showTab (tabIdPageName) {
         this.tabId = tabIdPageName;
  }

  constructor(public photoService: PhotoService, public authService: FireAuthService, public router: Router,
              public loadingController: LoadingController, private db: AngularFirestore, private changeRef: ChangeDetectorRef,
              private alertController: AlertController, private fs: FirestoreService) {

               this.mainuser = db.collection('utilizador').doc(this.user);
               this.userProfile = this.mainuser.valueChanges().subscribe(dados => {
                    this.fullName = dados.fullName,
                    this.email = dados.email,
                    this.happy = dados.happy,
                    this.notifications = dados.notifications,
                    this.picture = dados.picture
               });

               this.fs.getFriends().subscribe(friends => {
                    this.userFriends = friends;
               })
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

//   public getFriends(): Observable<Array<String>> {
//       return this.user
//           .pipe(takeUntil(this.unsubscribe),
//               switchMap(user => {
//                   return this.mainuser.collection('friends').valueChanges();
//               }));
//   }

}
