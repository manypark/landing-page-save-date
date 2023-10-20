import { NgModule } from '@angular/core';

import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { DividerModule } from 'primeng/divider';
import { CalendarModule } from 'primeng/calendar';
import { InputMaskModule } from 'primeng/inputmask';

@NgModule({
  imports:[
    MenuModule,
    ButtonModule,
    MenubarModule,
    CalendarModule,
    DividerModule,
    InputMaskModule,
  ],
  exports: [
    MenuModule,
    ButtonModule,
    MenubarModule,
    CalendarModule,
    DividerModule,
    InputMaskModule,
  ]
})
export class CoreModule { }
