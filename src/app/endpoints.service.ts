import { Injectable } from '@angular/core';
import { EndpointsApiService } from './endpoints.api.service';
import { BehaviorSubject } from 'rxjs';
import { EndpointListResponse, ConnectonGraphResponse} from './endpoints.api.service.model';

@Injectable({
  providedIn: 'root'
})
export class EndpointsService {

  private endpointList = new BehaviorSubject<EndpointListResponse>({
    endpointList: [],
    endpointStatuses: [],
  });
  public endpointList$ = this.endpointList.asObservable();
  private connectionGraphGrouped = new BehaviorSubject<ConnectonGraphResponse>({items: []});
  public connectionGraphGrouped$ = this.connectionGraphGrouped.asObservable();

  constructor(
    private endpointsApiService: EndpointsApiService
  ) { }

  fetchEndpointList() {
    this.endpointsApiService.fetchEndpointList()
      .subscribe(_ => this.endpointList.next(_));
  }

  clearEndpoints() {
    this.endpointsApiService.clearEndpoints()
      .subscribe(_ => this.endpointList.next({ endpointList: [], endpointStatuses: [] }));
  }

  clearEndpoint(connectionId) {
    return this.endpointsApiService.clearEndpoint(connectionId);
  }

  getStatus() {
    return this.endpointsApiService.getStatus();
  }

  changeStatusById(id, status) {
    return this.endpointsApiService.changeStatusById({ connectionId: id, state: status });
  }

  getConnectionGraphGrouped() {
    this.endpointsApiService.getConnectionGraphGrouped()
      .subscribe(_ => this.connectionGraphGrouped.next(_));
  }

  getColorBasedOnStatus(status) {
    const color = this.endpointList.value.endpointStatuses.find((_) => _.value === status || _.display === status);
    return color ? color.color : `grey`;
  }
}
