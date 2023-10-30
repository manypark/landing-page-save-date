import { NgModule } from '@angular/core';

import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { DividerModule } from 'primeng/divider';
import { CalendarModule } from 'primeng/calendar';
import { InputMaskModule } from 'primeng/inputmask';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { PaginatorModule } from 'primeng/paginator';
import { GalleriaModule } from 'primeng/galleria';
import { MessagesModule } from 'primeng/messages';

@NgModule({
  imports:[
    MenuModule,
    ButtonModule,
    MenubarModule,
    CalendarModule,
    DividerModule,
    InputMaskModule,
    FileUploadModule,
    ToastModule,
    PaginatorModule,
    GalleriaModule,
    MessagesModule,
  ],
  exports: [
    MenuModule,
    ButtonModule,
    MenubarModule,
    CalendarModule,
    DividerModule,
    InputMaskModule,
    FileUploadModule,
    ToastModule,
    PaginatorModule,
    GalleriaModule,
    MessagesModule,
  ]
})

export class CoreModule { }
