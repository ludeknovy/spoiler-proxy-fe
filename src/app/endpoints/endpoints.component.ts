import { Component, OnInit } from '@angular/core';
import { EndpointsService } from '../endpoints.service';
import { Observable } from 'rxjs';
import { EndpointListResponse } from '../endpoints.api.service.model';
import { AutoRefreshService } from '../auto-refresh.service';

@Component({
  selector: 'app-endpoints',
  templateUrl: './endpoints.component.html',
  styleUrls: ['./endpoints.component.css']
})
export class EndpointsComponent implements OnInit {
  endpointList$: Observable<EndpointListResponse>;

  constructor(
    private endpointsService: EndpointsService,
    private autoRefreshService: AutoRefreshService
  ) {
    this.endpointList$ = endpointsService.endpointList$;
  }

  availableStatuses;
  endpointList;
  endpointsFiltered;
  searchTerm;

  ngOnInit() {
    this.endpointList$.subscribe((_) => {
      this.availableStatuses = _.endpointStatuses;
      this.endpointList = _.endpointList.map((__) => {
        __.actualStatus = this.availableStatuses.find((s) => s.value === __.actualStatus).display;
        return __;
      });

      if (this.searchTerm) {
        this.search(this.searchTerm);
      } else {
        this.endpointsFiltered = this.endpointList;
      }
    });
  }

  search(term: string) {
    this.searchTerm = term;
    if (term) {
      this.endpointsFiltered = this.endpointList.filter(x =>
        x.name.trim().toLowerCase().includes(term.trim().toLowerCase())
      );
    } else {
      this.endpointsFiltered = this.endpointList;
    }
  }

  getActualStatus(value) {
    return value;
  }

  orderStatuses(value) {
    const statuses = this.availableStatuses.filter((_) => _.display !== value).map((_) => _.display);
    return statuses;
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
        res => this.autoRefreshService.continue(),
        err => this.endpointsService.fetchEndpointList());
  }

  getColor(status) {
    return this.endpointsService.getColorBasedOnStatus(status);
  }

  toggled(isOpen) {
    isOpen ? this.autoRefreshService.pause() : this.autoRefreshService.continue();
  }

  clearEndpoint(id) {
    this.endpointsService.clearEndpoint(id).subscribe(_ => {
      this.endpointsService.fetchEndpointList();
      return _;
    });
  }

}
