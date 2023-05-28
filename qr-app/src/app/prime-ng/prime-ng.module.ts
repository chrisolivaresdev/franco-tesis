import { NgModule } from '@angular/core';
import {InputTextModule} from 'primeng/inputtext';
import {InputNumberModule} from 'primeng/inputnumber';
import {CalendarModule} from 'primeng/calendar';
import {ButtonModule} from 'primeng/button';
import {TooltipModule} from 'primeng/tooltip';

@NgModule({
  declarations: [],
  imports: [
    InputTextModule,
    InputNumberModule,
    CalendarModule,
    ButtonModule,
    TooltipModule
  ],
  exports:[
    InputTextModule,
    InputNumberModule,
    CalendarModule,
    ButtonModule,
    TooltipModule
  ]
})
export class PrimeNgModule { }
