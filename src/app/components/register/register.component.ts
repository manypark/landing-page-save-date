import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RegisterForm } from 'src/app/forms/register-form';
import { UserRegister } from 'src/app/interfaces/user-register';
import { FormService } from 'src/app/services/form.service';
import { CoreModule } from 'src/app/core/core.module';

@Component({
  selector    : 'app-register',
  standalone  : true,
  imports     : [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
  ],
  templateUrl : './register.component.html',
  styleUrls   : ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form  : FormGroup = new RegisterForm().buildForm(this.formBuilder);
  isLoading:boolean = false;

  constructor(
    private readonly formBuilder  : FormBuilder,
    private readonly formServices : FormService,
  ) {}

  ngOnInit(): void {

    this.formServices.resetForm$.subscribe( data => {      
      if(data) {
        this.form.reset({
          resident: 'United kingdom',
          lada: '(+52)'
        });
      }
    });

  }

  submit(ve:any) {

    if( !this.form.valid ) return;

    const { name, email, resident, otherResident, phone, lada, otherLada, shoe, food } = this.form.value;

    const user:UserRegister = {
      name,
      email,
      resident:  resident == 'Otro' ? otherResident : resident,
      phone,
      lada: lada == 'Otro' ? otherLada : lada,
      shoe,
      food
    };


    // this.scrollToSection();

    this.formServices.setRegisterForm(user);
    
  }


  get errorName():boolean | undefined {
    return this.form.get('name')?.hasError('required') && this.form.get('name')?.touched;
  }

  get errorShoe():boolean | undefined {
    return this.form.get('shoe')?.hasError('required') && this.form.get('shoe')?.touched;
  }

  get errorFood():boolean | undefined {
    return this.form.get('food')?.hasError('required') && this.form.get('food')?.touched;
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
