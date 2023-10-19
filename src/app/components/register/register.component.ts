import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RegisterForm } from 'src/app/forms/register-form';
import { ToastService } from 'src/app/services/toast.service';
import { UserRegister } from 'src/app/interfaces/user-register';
import { RegisterUserService } from 'src/app/services/register-user.service';

@Component({
  selector    : 'app-register',
  standalone  : true,
  imports     : [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl : './register.component.html',
  styleUrls   : ['./register.component.scss']
})
export class RegisterComponent {

  form  : FormGroup = new RegisterForm().buildForm(this.formBuilder);
  selectedLanguage = 'es';
  isLoading:boolean = false;
  numeroAleatorio:number = 0;

  constructor(
    private readonly formBuilder  : FormBuilder,
    private readonly userServices : RegisterUserService,
    private readonly toastServices: ToastService,
  ) {}

  submit(ve:any) {

    if( !this.form.valid ) return;

    const { name, email, resident, otherResident, phone, lada, otherLada } = this.form.value;

    const user:UserRegister = {
      name,
      email,
      resident:  resident == 'Otro' ? otherResident : resident,
      phone,
      lada: lada == 'Otro' ? otherLada : lada
    };

    this.isLoading = true;

    this.userServices.saveUser(user).subscribe( (res:any) => {

      this.isLoading = false;

      if( res.status == 'ok' ) {
        this.toastServices.openSuccessSnakcBar('hemos enviado un correo de confirmación, revisa tu e-mail', 'Registro exitoso');
        this.form.reset({
          resident: 'United kingdom',
          lada: '(+52)'
        });
      }

      if( res.status == 'false' ) {
        this.toastServices.openSuccessSnakcBar('Hemos enviado un correo de confirmación, revisa tu e-mail', 'Registro exitoso');
        this.form.reset({
          resident: 'United kingdom',
          lada: '(+52)'
        });
      }

    }, err => {
      this.isLoading = false;
    });
    
  }

  get errorName():boolean | undefined {
    return this.form.get('name')?.hasError('required') && this.form.get('name')?.touched;
  }

  get errorEmail():boolean | undefined {
    return this.form.get('email')?.hasError('required') && this.form.get('email')?.touched;
  }

  get errorEmailPattern():boolean | undefined {
    return this.form.get('email')?.hasError('pattern') && this.form.get('email')?.touched;
  }

  get errorPhone():boolean | undefined {
    return this.form.get('phone')?.hasError('required') && this.form.get('phone')?.touched;
  }

  get resident():string {
    return this.form.get('resident')?.value;
  }

  get lada():string {
    return this.form.get('lada')?.value;
  }

}
