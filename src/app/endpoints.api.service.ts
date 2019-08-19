import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EndpointListResponse, ChangeStatusBody, StatusResponse, ConnectonGraphResponse } from './endpoints.api.service.model';

@Injectable({
  providedIn: 'root'
})
export class EndpointsApiService {
  constructor(private http: HttpClient) {
  }

  fetchEndpointList(): Observable<EndpointListResponse> {
    return this.http.get<EndpointListResponse>(
      `list-endpoints`);
  }

  clearEndpoints(): Observable<undefined> {
    return this.http.post<undefined>(`clear-endpoints`, undefined);
  }

  changeStatusById(body: ChangeStatusBody): Observable<undefined> {
    return this.http.post<undefined>('change-status-by-id', body);
  }

  getStatus(): Observable<StatusResponse> {
    return this.http.get<StatusResponse>('get-status');
  }

  getConnectionGraphGrouped(): Observable<ConnectonGraphResponse> {
    return this.http.get<ConnectonGraphResponse>('get-connection-graph-grouped');
  }
}
