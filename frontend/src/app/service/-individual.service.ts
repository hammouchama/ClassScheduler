import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Individual } from '../model/individual.model';
import { environment } from '../environments/envi';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class IndividualService {

  constructor(private httpClient: HttpClient) {
  }

  public registerToFormation(formationId: number, data: any) {
    return this.httpClient.post(environment.apiEndpoint + `/public/individual/register/${formationId}`, data);
  }
}
