import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Assistant } from '../model/assistant.model';
import { environment } from '../environments/envi';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AssistantService {
  requestHeader = {
    Authorization: `Bearer ${this.auth.getToken()}`,
    'Content-Type': 'application/json',
  }
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.auth.getToken()}` // Replace with your actual token
  });
  constructor(private httpClint: HttpClient,
    private auth: UserAuthService) {
    console.log(this.auth.getToken());

  }

  public getAllAssistant() {
    return this.httpClint.get<Assistant[]>(environment.apiEndpoint + "/admin/getAllAssistant")
  }
  public getAssistant(id: number) {
    return this.httpClint.get<Assistant>(environment.apiEndpoint + `/admin/assistant/${id}`)
  }
  public deletAssistant(id: number) {
    console.log("id", id)
    console.log("API", environment.apiEndpoint + `/admin/assistant/${id}`)

    return this.httpClint.delete(environment.apiEndpoint + `/admin/assistant/${id}`, { headers: this.headers })
  }
}
