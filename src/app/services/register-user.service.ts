import { Injectable } from '@angular/core';
import { UserRegister } from '../interfaces/user-register';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterUserService {

  constructor(
    private readonly http:HttpClient
  ) { }

  saveUser( user:UserRegister ) {
    return this.http.post('https://benefit-back.onrender.com/api/users', user);
    // return this.http.post('http://localhost:3000/api/users', user);
  }
}
