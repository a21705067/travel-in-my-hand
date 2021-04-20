import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import {FirestoreService} from './firestore.service';

@Injectable({
  providedIn: 'root'
})
export class FireAuthService {
  authState: any = null;


  constructor(private firebaseService: FirestoreService, public afAuth: AngularFireAuth) {
  }

  public doRegister(value: { email: string, password: string }): Promise<firebase.auth.UserCredential> {
    return firebase.auth().createUserWithEmailAndPassword(value.email, value.password);
  }

  public doLogin(value: { email: string, password: string }): Promise<firebase.auth.UserCredential> {
    return firebase.auth().signInWithEmailAndPassword(value.email, value.password);
  }

  public doLogout(): Promise<void> {
    this.firebaseService.unsubscribeOnLogout();
    return this.afAuth.auth.signOut();
  }

  public resetPassword(email: string): Promise<void> {
    return firebase.auth().sendPasswordResetEmail(email);
  }

}
