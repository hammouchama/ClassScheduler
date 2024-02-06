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
  //get and set the user id
  public setUserId(userId: string) {
    localStorage.setItem("userId", userId)
  }
  public getUserId(): string {
    console.log(localStorage);
    return "" + localStorage.getItem("userId")
  }
  //get and set the user city
  public setUserCity(city: string) {
    localStorage.setItem("city", city)
  }
  public getUserCity(): string {
    return "" + localStorage.getItem("city")
  }

  //Clears the local storage
  public clear() {
    localStorage.clear();
  }

  public isLoggedIn() {
    return !!this.getRole() && !!this.getToken()
  }
  public isAdmmin() {
    return !!this.getRole() && this.getRole() === "Admin";
  }

  public roleMatch(allowedRoles: string[]): boolean {
    const userRole = this.getRole();

    if (userRole !== null) {

      // Check if the userRole is equal to any of the allowed roles
      return allowedRoles.includes(userRole.trim());
    }

    return false;
  }
  public isTrainer() {
    return !!this.getRole() && this.getRole() === "Trainer";
  }
}
