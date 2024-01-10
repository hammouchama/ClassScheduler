import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Assistant } from '../model/assistant.model';
import { environment } from '../environments/envi';

@Injectable({
  providedIn: 'root'
})
export class AssistantService {

  constructor(private httpClint: HttpClient) { }

  public getAllAssistant() {
    return this.httpClint.get<Assistant[]>(environment.apiEndpoint + "/admin/getAllAssistant")
  }
}
