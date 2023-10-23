import { NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { CoreModule } from './core/core.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';

import { AppComponent } from './app.component';
import { ToastService } from './services/toast.service';
import { AppRoutingModule } from './app-routing.module';
import { RegisterComponent } from './components/register/register.component';
import { FlightsComponent } from './components/flights/flights.component';
import { OnlyNumbersDirective } from './shared/only-numbers.directive';
import { OnlyNumbersDoubleDirective } from './shared/only-numbers-double.directive';
import { UploadImagesComponent } from './components/upload-images/upload-images.component';
import { environment } from 'src/enviroments/enviroment';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    OnlyNumbersDirective,
    OnlyNumbersDoubleDirective,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    CoreModule,

    RegisterComponent,
    FlightsComponent,
    UploadImagesComponent,
  ],
  providers: [
    ToastService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
