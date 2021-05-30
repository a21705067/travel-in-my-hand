import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireStorage} from '@angular/fire/storage';
import {Observable, Subject} from 'rxjs';
import * as firebase from 'firebase/app';
import {AngularFireAuth} from '@angular/fire/auth';
import {map, switchMap, takeUntil} from 'rxjs/operators';
import {Photo} from './photo.service';
import {LoadingController} from '@ionic/angular';
import TaskState = firebase.storage.TaskState;
import { auth } from 'firebase/app';


@Injectable({
    providedIn: 'root'
})
export class FirestoreService {

    private static USERS_KEY = 'users';
    private static IMAGES_KEY = 'images';
    private unsubscribe: Subject<void> = new Subject<void>();

    constructor(public af: AngularFirestore, public fireStorage: AngularFireStorage, public angularAuth: AngularFireAuth,
                public loadingController: LoadingController) {
    }



	reAuth(username: string, password: string) {
		return this.angularAuth.auth.currentUser.reauthenticateWithCredential(auth.EmailAuthProvider.credential(username, password))
	}

    public async sendFile(imgData: string): Promise<void> {
        const currentUser = firebase.auth().currentUser;
        const imageBytes = this.convertBase64intoUint8Array(imgData);
        const imageId = this.af.createId();

        const loading = await this.loadingController.create({
            message: 'Uploading picture please wait..',
            spinner: 'bubbles'
        });
        await loading.present();

        this.fireStorage.ref(`images/${currentUser.uid}/${imageId}`)
            .put(imageBytes, {contentType: 'image/jpeg'})
            .then(async res => {
                /*
                * Only when you finish uploading, you can trigger reloading by adding new image in user relation
                * */
                if (res.state === TaskState.SUCCESS) {
                    this.af.collection(FirestoreService.USERS_KEY).doc(currentUser.uid)
                        .collection(FirestoreService.IMAGES_KEY).doc(imageId).set({id: imageId}).then(() => loading.dismiss());
                }
            });
    }

    public getUserFiles(): Observable<Array<Observable<any>>> {
        return this.angularAuth.user
            .pipe(takeUntil(this.unsubscribe),
                switchMap(user => {
                    return this.af.collection(FirestoreService.USERS_KEY).doc(user.uid)
                        .collection<Photo>(FirestoreService.IMAGES_KEY).valueChanges()
                        .pipe(map(photos => {
                            return photos.map(photo => {
                                return this.fireStorage.ref(`images/${user.uid}/${photo.id}`).getDownloadURL();
                            });
                        }));
                }));
    }

    public unsubscribeOnLogout(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

    private convertBase64intoUint8Array(imageData: string): Uint8Array {
        const raw = window.atob(imageData);
        const array = new Uint8Array(new ArrayBuffer(raw.length));
        for (let i = 0; i < raw.length; i++) {
            array[i] = raw.charCodeAt(i);
        }
        return array;
    }

}
