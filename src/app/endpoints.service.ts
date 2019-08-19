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

  changeStatusById(id, status) {
    return this.endpointsApiService.changeStatusById({connectionId: id, state: status });
  getColorBasedOnStatus(status) {
    const colors = [
      { value: 'on', display: 'ON', color: '#36B37E' },
      { value: 'off', display: 'OFF', color: '#FF5630' },
      { value: 'noReply', display: 'NO_REPLY', color: '#FFAB00' },
      { value: 'slow', display: 'SLOW', color: '#00B8D9' }
    ];
    const color = colors.find((_) => _.value === status || _.display === status);
    return color ? color.color : `grey`;
  }
}
