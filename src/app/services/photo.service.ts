import {Injectable} from '@angular/core';
import {Camera, CameraOptions} from '@ionic-native/camera/ngx';
import {FirestoreService} from './firestore.service';
import {Observable} from 'rxjs';
import {ActionSheetController} from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class PhotoService {

    constructor(private camera: Camera, public fireStore: FirestoreService,
                public actionSheetController: ActionSheetController) {
    }

    public async takePicture(): Promise<void> {
        const actionSheet = await this.actionSheetController.create({
            header: 'Choose your source type',
            buttons: [
                {
                    text: 'Camera',
                    handler: () => this.handleSelection('Camera'),
                    role: 'destructive'
                },
                {
                    text: 'Gallery',
                    handler: () => this.handleSelection('Gallery'),
                    role: 'destructive'
                }
            ]
        });
        await actionSheet.present();
    }

    public loadSaved(): Observable<Array<Observable<any>>> {
        return this.fireStore.getUserFiles();
    }

    private handleSelection(selection: 'Camera' | 'Gallery'): void {
        const options: CameraOptions = {
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            sourceType: selection === 'Camera' ?
                this.camera.PictureSourceType.CAMERA : this.camera.PictureSourceType.PHOTOLIBRARY
        };
        this.camera.getPicture(options).then(async (imageData) => {
            await this.fireStore.sendFile(imageData);
        }, (err) => {
            // Handle error
            console.log('Camera issue: ' + err);
        });
    }

}

export class Photo {
    id: any;
}
