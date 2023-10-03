import { Injectable, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  toastServices = inject(ToastrService);

  openSuccessSnakcBar( title?:string, subtitle?:string ) {

    this.toastServices.success(title, subtitle, {
      timeOut     : 3000,
      closeButton : true,
      progressBar : true,
    });

  }

  openErrorSnakcBar( title?:string, subtitle?:string ) {

    this.toastServices.error(title, subtitle, {
      timeOut     : 3000,
      closeButton : true,
      progressBar : true,
    });

  }

}
