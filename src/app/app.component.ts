import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { UserRegister } from './interfaces/user-register';
import { FormService } from './services/form.service';
import { RegisterForm } from './forms/register-form';

@Component({
  selector    : 'app-root',
  templateUrl : './app.component.html',
  styleUrls   : ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'Beneverse Latam 2023';
  selectedLanguage = 'en';
  items: MenuItem[] | undefined;
  form  : FormGroup = new RegisterForm().buildForm(this.formBuilder);
  isLoading:boolean = false;
  
  constructor(
    private readonly translateService: TranslateService,
    private readonly formBuilder  : FormBuilder,
    private readonly formServices : FormService,
  ) {
    this.translateService.setDefaultLang(this.selectedLanguage);
    this.translateService.use(this.selectedLanguage);
  }

  selectLanguage(lang: string) {
    this.translateService.use(lang);
  }

  ngOnInit(): void {
    this.loadItems();
    this.listenerFormSave();
  }

  listenerFormSave() {
    this.formServices.resetForm$.subscribe( data => {      
      if(data) {
        this.form.reset({
          resident: 'United kingdom',
          lada: '(+52)'
        });
      }
    });
  }
  loadItems() {
    this.items = [
      {
          items: [
              {
                  label: 'RECOMMENDATIONS',
                  command: () => {
                    this.scrollToSection('#dress');
                  }
              },
              {
                  label: 'SCHEDULE',
                  command: () => {
                    this.scrollToSection('#event');
                  }
              },
              {
                  label: 'LOCATION',
                  command: () => {
                    this.scrollToSection('#location');
                  }
              },
              {
                  label: 'Sign up',
                  command: () => {
                    this.scrollToSection('#register');
                  }
              },
          ]
      }
    ];
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


    this.scrollToSection('#register-flight');

    this.formServices.setRegisterForm(user);
  }


  get errorName():boolean | undefined {
    return this.form.get('name')?.hasError('required') && this.form.get('name')?.touched;
  }

  get errorShoe():boolean | undefined {
    return this.form.get('shoe')?.hasError('required') && this.form.get('shoe')?.touched;
  }

  get errorShoePattern():boolean | undefined {
    return this.form.get('shoe')?.hasError('pattern') && this.form.get('shoe')?.touched;
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

  scrollToSection(sectionId: string) {
    const section = document.querySelector(sectionId) as HTMLElement;
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }
}