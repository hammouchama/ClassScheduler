import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/envi';
import { RemarksTokenValidationDTO } from '../model/remarks-token-validation.dto';

@Injectable({
  providedIn: 'root',
})
export class RemarksService {
  constructor(private http: HttpClient) {}

  getAllRemarks(): Observable<any> {
    return this.http.get(`${environment.apiEndpoint}/remarks/all`);
  }

  getRemarksById(id: number): Observable<any> {
    return this.http.get(`${environment.apiEndpoint}/remarks/${id}`);
  }

  addRemarks(requestMap: Map<string, string>): Observable<any> {
    return this.http.post(`${environment.apiEndpoint}/remarks/add`, requestMap);
  }

  /* updateRemarks(id: number, requestMap: Map<string, string>): Observable<any> {
    return this.http.put(
      `${environment.apiEndpoint}/remarks/update/${id}`,
      requestMap
    );
  } */

  deleteRemarks(id: number): Observable<any> {
    return this.http.delete(`${environment.apiEndpoint}/remarks/delete/${id}`);
  }

  submitRemarks(requestMap: Map<string, string>): Observable<any> {
    return this.http.put(
      `${environment.apiEndpoint}/public/remarks/submit`,
      requestMap
    );
  }

  validateRemarksToken(token: string): Observable<RemarksTokenValidationDTO> {
    return this.http.get<RemarksTokenValidationDTO>(
      `${environment.apiEndpoint}/public/remarks/verifyToken/${token}`
    );
  }
}
