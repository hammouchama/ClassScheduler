import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor() { }

  public setRole(rele: string) {
    localStorage.setItem("role", rele)
  }
  public getRole() {
    return localStorage.getItem("role");
  }
  public setToken(jwtToken: string) {
    localStorage.setItem("token", jwtToken)
  }
  public getToken(): string {
    return "" + localStorage.getItem("token")
  }
  public clear() {
    localStorage.clear();
  }

  public isLoggedIn() {
    return this.getRole() && this.getToken()
  }
  public isAdmmin() {
    return this.getRole() && this.getRole() === "Admin";
  }
}
