import { NgModule } from '@angular/core';

import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';

@NgModule({
  imports:[
    MenuModule,
    ButtonModule,
    MenubarModule,
  ],
  exports: [
    MenuModule,
    ButtonModule,
    MenubarModule,
  ]
})
export class CoreModule { }
