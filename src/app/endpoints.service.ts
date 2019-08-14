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
    socksPort: null,
    socksProxyRunning: false,
    version: undefined
  });
  public scenarios$ = this.endpointList.asObservable();

  constructor(
    private endpointsApiService: EndpointsApiService
  ) { }

  fetchEndpointList() {
    this.endpointsApiService.fetchEndpointList()
      .subscribe(_ => this.endpointList.next(_));
  }
}
