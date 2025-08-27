import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [CommonModule, FormsModule]
})
export class AppComponent {
  title = 'ngMVCEtWebAPI';
  result = "";
  apiURL = 'https://localhost:7186/api/Account/';
  testDataURL = 'https://localhost:7186/api/TestData/';

  username = "tester";
  motDePass = "Passw0rd!";
  email = "test@test.com";

  newTestDataName = "";

  constructor(private http: HttpClient) {}

  isLoggedIn() : boolean {
    return sessionStorage.getItem("token") != null;
  }

  async register() {
    try {
      const response = {
        username: this.username,
        email: this.email,
        password: this.motDePass,
        passwordConfirm: this.motDePass
      };
      await lastValueFrom(this.http.post(this.apiURL + 'Register', response));
      this.result = "Register success"
    }
    catch (e: any) {
      this.result = e.message;
    }
  }

  async login() {
    try {
      const response = {
        username: this.username,
        password: this.motDePass
      };
      const res: any = await lastValueFrom(this.http.post(this.apiURL + 'Login', response));
      if (res && res.token) {
        sessionStorage.setItem("token", res.token);
        this.result = "Connexion réussie.";
      } else {
        this.result = "Erreur: Token manquant.";
      } 
    }
    catch (e: any) {
      this.result = e.message;
    }
  }

  logout() {
    sessionStorage.removeItem("token");
    this.result = "Déconnexion réussie.";
  }

  async publicCall() {
    try {
      let x = await lastValueFrom(this.http.get(this.apiURL + 'PublicTest', { responseType: 'text' }));
      this.result = x;
    }
    catch (e: any) {
      this.result = e.message;
    }
  }

  async privateCall() {
    try {
      let x = await lastValueFrom(this.http.get(this.apiURL + 'PrivateTest', { responseType: 'text' }));
      this.result = x;
    } catch (e: any) {
      this.result = e.message;
    }
  }

  async createTestData() {
    try {
      const testData = {
        name: this.newTestDataName
      };
      await lastValueFrom(this.http.post(this.testDataURL + 'CreateData', testData));
      this.result = "Yay";
      this.newTestDataName = "";
    }
    catch (e: any) {
      this.result = e.message;
    }
  }

}


