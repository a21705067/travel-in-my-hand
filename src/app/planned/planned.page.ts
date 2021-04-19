import { Component, OnInit } from '@angular/core';
import {FireAuthService} from '../services/fire-auth.service';
import {Router} from '@angular/router';
import {LoadingController} from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';

@Component({
  selector: 'app-planned',
  templateUrl: './planned.page.html',
  styleUrls: ['./planned.page.scss'],
})
export class PlannedPage implements OnInit {

  public UserDestinationsList: any[] = [];

  constructor(public authService: FireAuthService, public router: Router,
              public loadingController: LoadingController, private firestore: AngularFirestore) { }

  ngOnInit() {
    this.firestore.collection(`UserDestinations`).valueChanges()
        .subscribe(UserDestinationsList => {
          this.UserDestinationsList = UserDestinationsList;
        });
  }

  getUid(): any {
    return firebase.auth().currentUser.uid;
  }

  public logout(): void {
    this.authService.doLogout().then(() => this.router.navigate(['/login']), err => console.log(err));
  }
}
