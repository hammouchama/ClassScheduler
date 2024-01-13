import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Assistant } from '../model/assistant.model';
import { environment } from '../environments/envi';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AssistantService {
  constructor(private httpClient: HttpClient) {
  }

  public getAllAssistant() {
    return this.httpClient.get<Assistant[]>(environment.apiEndpoint + "/admin/getAllAssistant")
  }
  public getAssistant(id: number) {
    return this.httpClient.get<Assistant>(environment.apiEndpoint + `/admin/assistant/${id}`)
  }
  public deletAssistant(id: number) {
    return this.httpClient.delete(environment.apiEndpoint + `/admin/assistant/${id}`)
  }
  public updateAssistant(id: number, data: any) {
    return this.httpClient.put(environment.apiEndpoint + `/admin/assistant/${id}`, data);
  }
  public addAssistant(data: any) {
    return this.httpClient.post(environment.apiEndpoint + "/admin/addAssistant", data);
  }
}