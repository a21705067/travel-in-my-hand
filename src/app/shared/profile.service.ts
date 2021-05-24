import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private firestore: AngularFirestore) { }

  form = new FormGroup({
    customerName: new FormControl(""),
    orderNumber: new FormControl(""),
    coffeeOrder: new FormControl(""),
    completed: new FormControl(false)
  });

  //Firestore CRUD actions example
  createProfile(data) {
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection("Profile")
        .add(data)
        .then(res => {}, err => reject(err));
    });
  }

  updateProfile(data) {
    return this.firestore
      .collection("Profile")
      .doc(data.payload.doc.id)
      .set({ completed: true }, { merge: true });
  }

  getProfile() {
    return this.firestore.collection("Profile").snapshotChanges();
  }

  deleteProfile(data) {
    return this.firestore
      .collection("Profile")
      .doc(data.payload.doc.id)
      .delete();
  }
}
