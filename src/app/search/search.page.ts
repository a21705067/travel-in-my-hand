import { Component, OnInit } from '@angular/core';
import {FireAuthService} from '../services/fire-auth.service';
import {Router} from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  public DestinationList: any[] = [];
  public loadedDestinationList: any[];

  constructor(public authService: FireAuthService, public router: Router,
              public loadingController: LoadingController, private firestore: AngularFirestore) {
    this.initializeItems();
  }

  ngOnInit() {
    this.firestore.collection(`Destination`).valueChanges()
        .subscribe(DestinationList => {
          this.DestinationList = DestinationList;
          this.loadedDestinationList = DestinationList;
    });
  }

  initializeItems(): void {
    this.DestinationList = this.loadedDestinationList;
  }

  filterList(evt) {
    this.initializeItems();

    const searchTerm = evt.target.value;

    if (!searchTerm) {
      return;
    }

    this.DestinationList = this.DestinationList.filter(currentDestination => {
      if (currentDestination.Country && searchTerm || currentDestination.Location && searchTerm) {
        if (currentDestination.Country.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
  }

  public logout(): void {
    this.authService.doLogout().then(() => this.router.navigate(['/login']), err => console.log(err));
  }

  private location(location: any, country: any, img: string): void {
    this.router.navigate(['location', { location: location, country: country, img: img }]);
  }
}
