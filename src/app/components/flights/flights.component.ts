import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CoreModule } from 'src/app/core/core.module';

import { RegisterFlightsForm } from 'src/app/forms/register-form-flights';
import { UserRegister } from 'src/app/interfaces/user-register';
import { RegisterUserService } from 'src/app/services/register-user.service';
import { ToastService } from 'src/app/services/toast.service';
import { FormService } from 'src/app/services/form.service';

@Component({
  selector    : 'app-flights',
  standalone  : true,
  imports     : [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
  ],
  templateUrl : './flights.component.html',
  styleUrls   : ['./flights.component.scss']
})
export class FlightsComponent implements OnInit {

  formBuilder  : FormBuilder = inject(FormBuilder);
  userServices : RegisterUserService = inject(RegisterUserService);
  toastServices: ToastService = inject(ToastService);
  formServices : FormService = inject(FormService);
  
  isLoading   : boolean = false;
  form        : FormGroup = new RegisterFlightsForm().buildForm(this.formBuilder);
  userInfo   ?: UserRegister;

  ngOnInit(): void {

    this.formServices.formRegister$.subscribe( data => {
      if(data == undefined) return;
      this.userInfo = data;
    });

  }
  
  submit(ev:any) {
    
    if( !this.form.valid ) return;

    const { data_arrival, data_return, time_arrival, time_return, airline_arrival, airline_return, origen, destiny } = this.form.value;

    const flights = {
      data_arrival, 
      data_return, 
      time_arrival, 
      time_return, 
      airline_arrival, 
      airline_return, 
      origen, 
      destiny 
    };

    const userInfoComplete:UserRegister = Object.assign(this.userInfo!, flights);

    this.isLoading = true;
    
    this.userServices.saveUser(userInfoComplete).subscribe( (res:any) => {
    
      if( res.status == 'ok' ) {
        this.toastServices.openSuccessSnakcBar('We have sent a confirmation email, please check your email', 'Successful registration');
        this.isLoading = false;
        this.formServices.setResetForm(true);
        this.form.reset();
      }

      if( res.status == 'false' ) {
        this.toastServices.openSuccessSnakcBar('We have sent a confirmation email, please check your email', 'Successful registration');
        this.isLoading = false;
        this.formServices.setResetForm(true);
        this.form.reset();
      }

    }, err => {
      this.isLoading = false;
      this.formServices.setResetForm(true);
    });
  }

}
