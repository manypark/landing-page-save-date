import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserRegister } from '../interfaces/user-register';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  formRegister   = new BehaviorSubject<UserRegister | undefined>(undefined);
  formRegister$  = this.formRegister.asObservable();
  
  resetForm   = new BehaviorSubject<boolean>(false);
  resetForm$  = this.resetForm.asObservable();

  constructor() { }

  setRegisterForm( data?:UserRegister ) {
    this.formRegister.next(data);
  }

  setResetForm( band:boolean ) {
    this.resetForm.next(band);
  }


}
