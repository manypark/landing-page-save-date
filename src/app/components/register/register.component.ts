import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RegisterForm } from 'src/app/forms/register-form';
import { UserRegister } from 'src/app/interfaces/user-register';
import { FormService } from 'src/app/services/form.service';

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
export class RegisterComponent implements OnInit {

  form  : FormGroup = new RegisterForm().buildForm(this.formBuilder);
  selectedLanguage = 'es';
  isLoading:boolean = false;
  numeroAleatorio:number = 0;

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


    this.scrollToSection('register-flight');

    this.formServices.setRegisterForm(user);
    
  }

  scrollToSection(sectionId: string) {
    const section = document.querySelector(sectionId) as HTMLElement;
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
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
