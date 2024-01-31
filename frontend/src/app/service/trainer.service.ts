import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/envi';
import { Trainer } from '../model/trainer.model';

@Injectable({
  providedIn: 'root',
})
export class TrainerService {
  constructor(private httpClient: HttpClient) {}

  public getAllTrainer() {
    return this.httpClient.get<Trainer[]>(
      environment.apiEndpoint + '/trainer/get'
    );
  }
  public deleteTrainer(id: number) {
    return this.httpClient.delete(environment.apiEndpoint);
  }
  public registerTrainer(data: any) {
    return this.httpClient.post(
      environment.apiEndpoint + '/public/trainer/register',
      data
    );
  }
}
