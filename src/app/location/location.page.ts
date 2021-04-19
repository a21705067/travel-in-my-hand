import { Component, OnInit } from '@angular/core';
import {FireAuthService} from '../services/fire-auth.service';
import {Router, ActivatedRoute} from '@angular/router';
import { NavController } from '@ionic/angular';
import {LoadingController} from '@ionic/angular';
import {AngularFirestore} from '@angular/fire/firestore';
import {User} from 'firebase';
import * as firebase from 'firebase';

@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
})
export class LocationPage implements OnInit {
  DestinationLocation: string;
  DestinationCountry: string;
  DestinationImg: string;
  PrecautionList: any[] = [];

  constructor(public authService: FireAuthService, public router: Router, private firestore: AngularFirestore,
              public loadingController: LoadingController, public navCtrl: NavController, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.firestore.collection(`Precautions`).valueChanges()
        .subscribe(PrecautionList => {
          this.PrecautionList = PrecautionList;
        });
    this.DestinationLocation = this.activatedRoute.snapshot.paramMap.get('location');
    this.DestinationCountry = this.activatedRoute.snapshot.paramMap.get('country');
    this.DestinationImg = this.activatedRoute.snapshot.paramMap.get('img');
  }

  public logout(): void {
    this.authService.doLogout().then(() => this.router.navigate(['/login']), err => console.log(err));
  }

  getUid(): any {
    return firebase.auth().currentUser.uid;
  }

  public CreateRecord(location: string, country: string, img: string, uid: string) {
    this.firestore.collection('UserDestinations').add({
      Location: location,
      Country: country,
      Img: img,
      User: uid
    });
  }
}
