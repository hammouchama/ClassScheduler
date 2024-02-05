import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/envi';
import { RemarksTokenValidationDTO } from '../model/remarks-token-validation.dto';
import { Remarks } from '../model/remarks.model';

@Injectable({
  providedIn: 'root',
})
export class RemarksService {
  constructor(private http: HttpClient) {}

  getAllRemarks(){
    return this.http.get<Remarks[]>(`${environment.apiEndpoint}/remarks/all`);
  }

  getRemarksById(id: number){
    return this.http.get<Remarks>(`${environment.apiEndpoint}/remarks/${id}`);
  }

  addRemarks(data: any){
    return this.http.post(`${environment.apiEndpoint}/remarks/add`, data);
  }

  /* updateRemarks(id: number, data: any){
    return this.http.put(
      `${environment.apiEndpoint}/remarks/update/${id}`,
      data
    );
  } */

  deleteRemarks(id: number){
    return this.http.delete(`${environment.apiEndpoint}/remarks/delete/${id}`);
  }

  submitRemarks(data: any){
    return this.http.put(
      `${environment.apiEndpoint}/public/remarks/submit`,
      data
    );
  }

  validateRemarksToken(token: string): Observable<RemarksTokenValidationDTO> {
    return this.http.get<RemarksTokenValidationDTO>(
      `${environment.apiEndpoint}/public/remarks/verifyToken/${token}`
    );
  }
}
