import { Injectable } from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Friend } from '../models/friends';

@Injectable({
  providedIn: 'root'
})
export class FriendsService {
    friendsCollection: AngularFirestoreCollection<Friend>;
    friends: Observable<Friend[]>;
    user = firebase.auth().currentUser.uid

  constructor() {
      this.friends = this.af.collection('utilizador').doc(this.user).collection('friends').snapshotChanges();
  }

  getFriends() {
     return this.friends;
  }
}
