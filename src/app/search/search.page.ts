import { Component, OnInit } from '@angular/core';
import { FireAuthService } from '../services/fire-auth.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  placesList: any[];
  placesListBackup: any[];

  constructor(public authService: FireAuthService, public router: Router,
              public loadingController: LoadingController, private db: AngularFirestore) {

  }

  async ngOnInit() {
    this.placesList = await this.initializeItems();
  }

  async initializeItems(): Promise<any> {
    const placesList = await this.db.collection('places')
      .valueChanges().pipe(first()).toPromise();
    this.placesListBackup = placesList;
    return placesList;
  }

  async filterList(event) {
    this.placesList = await this.initializeItems();
    const searchTerm = event.srcElement.value;

    if (!searchTerm) {
      return;
    }

    this.placesList = this.placesList.filter(currentPlace => {
      if (currentPlace.name && searchTerm) {
        return (currentPlace.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 || currentPlace.type.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
      }
    });
  }

}
