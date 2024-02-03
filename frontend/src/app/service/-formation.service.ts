import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Formation } from '../model/formation.model';
import { environment } from '../environments/envi';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root',
})
export class FormationService {
  constructor(private httpClient: HttpClient) {}

  public getAllFormation() {
    return this.httpClient.get<Formation[]>(
      environment.apiEndpoint + '/formation/get'
    );
  }
  public getFormation(id: number) {
    return this.httpClient.get<Formation>(
      environment.apiEndpoint + `/formation/get/${id}`
    );
  }
  public deletFormation(id: number) {
    return this.httpClient.delete(
      environment.apiEndpoint + `/formation/delete/${id}`
    );
  }
  public updateFormation(id: number, data: FormData) {
    return this.httpClient.put(
      environment.apiEndpoint + `/formation/update/${id}`,
      data
    );
  }
  public addFormation(data: any) {
    return this.httpClient.post(
      environment.apiEndpoint + '/formation/add',
      data
    );
  }
  public getAllPublicFormation() {
    return this.httpClient.get<Formation[]>(
      environment.apiEndpoint + '/public/formation/get'
    );
  }

  public getPublicFormation(id: number) {
    return this.httpClient.get<Formation>(
      environment.apiEndpoint + `/public/formation/get/${id}`
    );
  }

  public getPublicFormationBySlug(slug: String) {
    return this.httpClient.get<Formation>(
      environment.apiEndpoint + `/public/formation/getBySlug/${slug}`
    );
  }
}
