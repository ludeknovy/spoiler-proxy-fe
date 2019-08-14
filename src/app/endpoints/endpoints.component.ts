import { Component, OnInit } from '@angular/core';
import { EndpointsService } from '../endpoints.service';
import { Observable } from 'rxjs';
import { EndpointListResponse } from '../endpoints.api.service.model';

@Component({
  selector: 'app-endpoints',
  templateUrl: './endpoints.component.html',
  styleUrls: ['./endpoints.component.css', '../../shared-styles.scss']
})
export class EndpointsComponent implements OnInit {
  endpointList$: Observable<EndpointListResponse>;

  constructor(
    private endpointsService: EndpointsService,
  ) {
    this.endpointList$ = endpointsService.endpointList$;
  }

  availableStatuses;
  endpointList;
  endpointsFiltered;

  ngOnInit() {
    this.endpointsService.fetchEndpointList();
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

}
