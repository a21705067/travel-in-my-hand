import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Park} from './park';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ParkDataService {
    private dataURL = 'assets/data/data.json';
    private parkData: Array<any>;

    constructor(private http: HttpClient) {
    }

    public load(): Observable<any> {
        if (this.parkData !== undefined && this.parkData.length !== 0) {
            return of(this.parkData);
        }
        return this.http.get<Array<Park>>(this.dataURL).pipe(
            map(data => {
                data.forEach(park => {
                    park.image = 'assets/img/thumbs/' + park.image;
                });
                this.parkData = data;
                return data;
            }));
    }
}
