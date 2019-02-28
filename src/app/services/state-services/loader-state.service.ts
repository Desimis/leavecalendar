import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class LoaderStateService {

    private loading: BehaviorSubject<boolean> = new BehaviorSubject(false);

    get loading$(): Observable<boolean> {
        return new Observable(f => {this.loading.subscribe(f);});
    } 

    load(){
        this.loading.next(true);
    }

    finish(){
        this.loading.next(false);
    }
}
