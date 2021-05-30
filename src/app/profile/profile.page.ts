import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { PhotoService } from '../services/photo.service';
import { FireAuthService } from '../services/fire-auth.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { RouterModule, Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  tabId: string = 'Settings';
  mainuser: AngularFirestoreDocument
  userFriend: AngularFirestoreDocument
  userProfile
  userFriends
  fullName: string
  email: string
  happy: string
  notifications: boolean
  picture: string
  fullNameFriend: string
  friendID: string

  showTab (tabIdPageName) {
         this.tabId = tabIdPageName;
  }

  constructor(public photoService: PhotoService, public authService: FireAuthService, public router: Router,
              public loadingController: LoadingController, private db: AngularFirestore, private changeRef: ChangeDetectorRef,
              private alertController: AlertController) {

               this.mainuser = db.doc('profiles/' + this.authService.getUID());
               this.userFriend = db.doc('friends/' + this.authService.getUID());
               this.userProfile = this.mainuser.valueChanges().subscribe(dados => {
                    this.fullName = dados.fullName,
                    this.email = dados.email,
                    this.happy = dados.happy,
                    this.notifications = dados.notifications,
                    this.picture = dados.picture
               });
               this.userFriends = this.userFriend.valueChanges().subscribe(dados => {
                    this.fullNameFriend = dados.fullName,
                    this.friendID = dados.friendID
               });

//                this.changeRef.detectChanges();
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

    public home(): void {
        this.router.navigate(['/home']);
    }

    public map(): void {
        this.router.navigate(['/map']);
    }

    public search(): void {
        this.router.navigate(['/search']);
    }

    public camera(): void {
        this.router.navigate(['/camera']);
    }

}
