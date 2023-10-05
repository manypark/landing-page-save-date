import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { TranslateService } from '@ngx-translate/core';

import { MenuItem } from 'primeng/api';

import { UserRegister } from './interfaces/user-register';
import { RegisterForm } from './forms/register-form';
import { ToastService } from './services/toast.service';
import { RegisterUserService } from './services/register-user.service';

@Component({
  selector    : 'app-root',
  templateUrl : './app.component.html',
  styleUrls   : ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'Landing Page';
  form  : FormGroup = new RegisterForm().buildForm(this.formBuilder);
  selectedLanguage = 'es';
  items: MenuItem[] | undefined;
  
  constructor(
    private readonly formBuilder  : FormBuilder,
    private readonly userServices : RegisterUserService,
    private readonly toastServices: ToastService,
    private readonly translateService: TranslateService,
  ) {
    this.translateService.setDefaultLang(this.selectedLanguage);
    this.translateService.use(this.selectedLanguage);
  }

  selectLanguage(lang: string) {
    this.translateService.use(lang);
  }

  ngOnInit(): void {
    this.items = [
      {
          items: [
              {
                  label: 'RECOMENDACIONES',
                  command: () => {
                    this.scrollToSection('#informacion');
                  }
              },
              {
                  label: 'AGENDA',
                  command: () => {
                    this.scrollToSection('#agenda');
                  }
              },
              {
                  label: 'SEDE',
                  command: () => {
                    this.scrollToSection('#sede');
                  }
              },
              {
                  label: 'REGISTRARME',
                  command: () => {
                    this.scrollToSection('#registro');
                  }
              },
          ]
      }
    ];
  }

  scrollToSection(sectionId: string) {
    const section = document.querySelector(sectionId) as HTMLElement;
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
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
        this.form.reset({
          resident: 'United kingdom',
          lada: '(+52)'
        });
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
