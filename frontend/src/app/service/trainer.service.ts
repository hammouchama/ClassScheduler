import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/envi';
import { Trainer } from '../model/trainer.model';

@Injectable({
  providedIn: 'root',
})
export class TrainerService {
  constructor(private httpClient: HttpClient) { }

  public getAllTrainer() {
    return this.httpClient.get<Trainer[]>(
      environment.apiEndpoint + '/trainer/get'
    );
  }
  public deleteTrainer(id: number) {
    return this.httpClinet.delete(environment.apiEndpoint + `/trainer/delete/${id}`)
  }
  public getTrainer(id: number) {
    return this.httpClinet.get<Trainer>(environment.apiEndpoint + `/trainer/get/${id}`)
  }

  public acceptTrainer(id: number) {
    return this.httpClinet.get(environment.apiEndpoint + `/trainer/accept/${id}`)
  }
  public registerTrainer(data: any) {
    return this.httpClient.post(
      environment.apiEndpoint + '/public/trainer/register',
      data
    );
  }
}
