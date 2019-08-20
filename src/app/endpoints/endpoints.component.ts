import { Component, OnInit } from '@angular/core';
import { EndpointsService } from '../endpoints.service';
import { Observable, interval } from 'rxjs';
import { EndpointListResponse } from '../endpoints.api.service.model';
import { LocalStorageService } from '../local-storage.service';

@Component({
  selector: 'app-endpoints',
  templateUrl: './endpoints.component.html',
  styleUrls: ['./endpoints.component.css']
})
export class EndpointsComponent implements OnInit {
  endpointList$: Observable<EndpointListResponse>;

  constructor(
    private endpointsService: EndpointsService,
    private localStorageService: LocalStorageService
  ) {
    this.endpointList$ = endpointsService.endpointList$;
  }

  availableStatuses;
  endpointList;
  endpointsFiltered;
  autoRefresh;
  refreshInterval;

  ngOnInit() {
    this.endpointsService.fetchEndpointList();
    this.autoRefresh = this.getAutoRefreshFromStorage();
    this.setRefreshInterval();
    this.endpointList$.subscribe((_) => {
      this.availableStatuses = _.endpointStatuses;
      this.endpointList = _.endpointList.map((__) => {
        __.actualStatus = this.availableStatuses.find((s) => s.value === __.actualStatus).display;
        return __;
      });
      this.endpointsFiltered = this.endpointList;
    });
  }

  search(term: string) {
    const dataToFilter = this.endpointList;
    if (term) {
      this.endpointsFiltered = dataToFilter.filter(x =>
        x.name.trim().toLowerCase().includes(term.trim().toLowerCase())
      );
    } else {
      this.endpointsFiltered = dataToFilter;
    }
  }

  private setRefreshInterval() {
    if (this.autoRefresh) {
      this.refreshInterval = interval(5000).subscribe(() => {
        return this.refresh();
      });
    } else {
      if (this.refreshInterval) {
        this.refreshInterval.unsubscribe();
      }
    }
  }

  getActualStatus(value) {
    return value;
  }

  orderStatuses(value) {
    const statuses = this.availableStatuses.filter((_) => _.display !== value).map((_) => _.display);
    return [value, ...statuses];
  }

  refresh() {
    this.endpointsService.fetchEndpointList();
  }

  clearAll() {
    this.endpointsService.clearEndpoints();
  }

  changeStatus(status, id) {
    // change status for current data

    const [epListUpdated, epFilteredUpdated] = [this.endpointList, this.endpointsFiltered]
      .map((_) =>
        _.map((__) => __.id === id
          ? { ...__, actualStatus: status }
          : __));
    this.endpointList = epListUpdated;
    this.endpointsFiltered = epFilteredUpdated;

    // send request to backend to actual state
    this.endpointsService.changeStatusById(id, this.availableStatuses.find(_ => _.display === status).value)
      .subscribe(
        res => res,
        err => this.endpointsService.fetchEndpointList());
  }

  getColor(status) {
    return this.endpointsService.getColorBasedOnStatus(status);
  }

  getAutoRefreshFromStorage() {
    const value = this.localStorageService.getFromStorage('autoRefresh');
    if (value === null) {
      return true;
    }
    return value;
  }

  changeAuroRefresh() {
    this.autoRefresh = !this.autoRefresh;
    this.localStorageService.updateStorage('autoRefresh', this.autoRefresh);
    this.setRefreshInterval();
  }



}
