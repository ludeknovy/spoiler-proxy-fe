import { Injectable } from '@angular/core';
import { EndpointsApiService } from './endpoints.api.service';
import { BehaviorSubject } from 'rxjs';
import { EndpointListResponse } from './endpoints.api.service.model';

@Injectable({
  providedIn: 'root'
})
export class EndpointsService {

  private endpointList = new BehaviorSubject<EndpointListResponse>({
    endpointList: [],
    endpointStatuses: [],
  });
  public endpointList$ = this.endpointList.asObservable();

  constructor(
    private endpointsApiService: EndpointsApiService
  ) { }

  fetchEndpointList() {
    this.endpointsApiService.fetchEndpointList()
      .subscribe(_ => this.endpointList.next(_));
  }

  clearEndpoints() {
    this.endpointsApiService.clearEndpoints()
      .subscribe(_ => this.endpointList.next({endpointList: [], endpointStatuses: []}));
  }

  getStatus() {
    return this.endpointsApiService.getStatus();
  }
}
