import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RegisterForm } from './forms/register-form';
import { UserRegister } from './interfaces/user-register';
import { RegisterUserService } from './services/register-user.service';
import { ToastService } from './services/toast.service';

@Component({
  selector    : 'app-root',
  templateUrl : './app.component.html',
  styleUrls   : ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'Landing Page';
  form  : FormGroup = new RegisterForm().buildForm(this.formBuilder);
  
  constructor(
    private readonly formBuilder  : FormBuilder,
    private readonly userServices : RegisterUserService,
    private readonly toastServices: ToastService,
  ) { }


  ngOnInit(): void {
    
  }

  onSelectResident() {

  }

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

    this.userServices.saveUser(user).subscribe( (res:any) => {

      if( res.status == 'ok' ) {
        this.toastServices.openSuccessSnakcBar('Se ha enviado el correo de invitacion', 'Registro exitoso');
      }

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
