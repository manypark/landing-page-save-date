import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CoreModule } from 'src/app/core/core.module';

import { RegisterFlightsForm } from 'src/app/forms/register-form-flights';

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
export class FlightsComponent {

  formBuilder = inject(FormBuilder);
  form:FormGroup = new RegisterFlightsForm().buildForm(this.formBuilder);
  
  submit(ev:any) {

  }

}
