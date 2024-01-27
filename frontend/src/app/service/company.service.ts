import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/envi';
import { Company } from '../model/company.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {


  constructor(private httpClient: HttpClient) { }

  public addCompany(params: any) {
    return this.httpClient.post(environment.apiEndpoint + "/company/add", params)
  }
  public getAllCompany() {
    return this.httpClient.get<Company[]>(environment.apiEndpoint + "/company/get")
  }
  public deleteCompany(id: number) {
    return this.httpClient.delete(environment.apiEndpoint + `/company/delete/${id}`)
  }
  public updateCompany(companyId: any, value: any) {
    return this.httpClient.put(environment.apiEndpoint + `/company/update/${companyId}`, value)
  }
  public getCompany(id: number) {
    return this.httpClient.get<Company>(environment.apiEndpoint + `/company/get/${id}`)
  }
}
