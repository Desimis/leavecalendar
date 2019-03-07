import {Component} from '@angular/core';
import { LoaderStateService } from 'src/app/services/state-services/loader-state.service';

@Component({
    selector: 'app-loader',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.css']
})
export class LoaderComponent{

    loading: boolean;

    constructor(private loaderStateService: LoaderStateService){
    }

    ngOnInit(){
        this.loaderStateService.loading$.subscribe(
            state => {
              console.log(state)
                this.loading = state;
            }
        )
    }
}
