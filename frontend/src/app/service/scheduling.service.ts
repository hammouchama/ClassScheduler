import { Scheduling } from './../model/scheduling.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/envi';

@Injectable({
  providedIn: 'root',
})
export class SchedulingService {
  constructor(private httpClient: HttpClient) {}

  public addScheduing(data: any) {
    return this.httpClient.post(
      environment.apiEndpoint + '/scheduling/add',
      data
    );
  }
  public getAllScheduing() {
    return this.httpClient.get(environment.apiEndpoint + '/scheduling/get');
  }
  public getSchedulingByTrainer() {
    return this.httpClient.get(
      environment.apiEndpoint + `/trainer/scheduling`
    );
  }
  public deleteScheduling(id: number) {
    return this.httpClient.delete(
      environment.apiEndpoint + `/scheduling/delete/${id}`
    );
  }
  public updateScheduling(id: number, data: any) {
    return this.httpClient.put(
      environment.apiEndpoint + `/scheduling/update/${id}`,
      data
    );
  }
}
