import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector    : 'app-root',
  templateUrl : './app.component.html',
  styleUrls   : ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'Beneverse Latam 2023';
  selectedLanguage = 'en';
  items: MenuItem[] | undefined;
  
  constructor(
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
                    this.scrollToSection('#register');
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
}