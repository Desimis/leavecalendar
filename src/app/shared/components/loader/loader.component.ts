import {Component} from '@angular/core';
import { LoaderStateService } from 'src/app/services/loader-state.service';

@Component({
    selector: 'app-loader',
    template: `
    <div class="loaderContainer">
      <div *ngIf="loading" class="lds-dual-ring"></div>
    </div>
    `,
    styles:[`
        .loaderContainer{
            position:absolute;
            z-index:2000;
            top:50%;
            left:50%;
        }

        .lds-dual-ring {
          display: inline-block;
          width: 64px;
          height: 64px;
        }
        .lds-dual-ring:after {
          content: " ";
          display: block;
          width: 46px;
          height: 46px;
          margin: 1px;
          border-radius: 50%;
          border: 5px solid #fff;
          border-color: #fff transparent #fff transparent;
          animation: lds-dual-ring 1.2s linear infinite;
        }
        @keyframes lds-dual-ring {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
    `]
})
export class LoaderComponent{

    loading: boolean;

    constructor(private loaderStateService: LoaderStateService){
    }

    ngOnInit(){
        this.loaderStateService.loading$.subscribe(
            state => {
                this.loading = state;
            }
        )
    }
}
