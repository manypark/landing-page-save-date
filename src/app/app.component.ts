import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RegisterForm } from './forms/register-form';

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
  ) { }


  ngOnInit(): void {
    
  }

  onSelectResident() {
    
  }

  submit(ve:any) {

  }

  get resident():string {
    return this.form.get('resident')?.value;
  }

  get lada():string {
    return this.form.get('lada')?.value;
  }

}
