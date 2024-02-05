import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/envi';
import { Trainer } from '../model/trainer.model';

@Injectable({
  providedIn: 'root',
})
export class TrainerService {

  requestHeader = new HttpHeaders(
    { "NO-Auth": "True" }
  );
  constructor(private httpClient: HttpClient) { }

  public getAllTrainer() {
    return this.httpClient.get<Trainer[]>(
      environment.apiEndpoint + '/trainer/get'
    );
  }
  public deleteTrainer(id: number) {
    return this.httpClient.delete(environment.apiEndpoint + `/trainer/delete/${id}`)
  }
  public getTrainer(id: number) {
    return this.httpClient.get<Trainer>(environment.apiEndpoint + `/trainer/get/${id}`)
  }

  public acceptTrainer(id: number) {
    return this.httpClient.get(environment.apiEndpoint + `/trainer/accept/${id}`)
  }
  public registerTrainer(data: any) {
    return this.httpClient.post(
      environment.apiEndpoint + '/public/trainer/register',
      data, { headers: this.requestHeader }
    );
  }
  public getAllAceptedTrainers() {
    return this.httpClient.get<Trainer[]>(environment.apiEndpoint + "/trainer/accepted")
  }
}
