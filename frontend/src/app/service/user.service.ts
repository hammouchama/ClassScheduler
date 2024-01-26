import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "../environments/envi"
@Injectable({
  providedIn: 'root'
})
export class UserService {
  //? server address
  PATH_OF_API = environment.apiEndpoint

  requestHeader = new HttpHeaders(
    { "NO-Auth": "True" }
  );
  constructor(private httpclient: HttpClient) { }

  public login(loginData: any) {
    return this.httpclient.post(this.PATH_OF_API + "/login", loginData, { headers: this.requestHeader })

  }

}
