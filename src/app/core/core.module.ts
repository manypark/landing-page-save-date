import { NgModule } from '@angular/core';

import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { CalendarModule } from 'primeng/calendar';

@NgModule({
  imports:[
    MenuModule,
    ButtonModule,
    MenubarModule,
    CalendarModule,
  ],
  exports: [
    MenuModule,
    ButtonModule,
    MenubarModule,
    CalendarModule,
  ]
})
export class CoreModule { }
