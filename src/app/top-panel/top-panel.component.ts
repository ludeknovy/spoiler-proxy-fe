import { Component, OnInit } from '@angular/core';
import { EndpointsService } from '../endpoints.service';
import { AutoRefreshService } from '../auto-refresh.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-top-panel',
  templateUrl: './top-panel.component.html',
  styleUrls: ['./top-panel.component.css']
})
export class TopPanelComponent implements OnInit {

  autoRefresh: boolean;
  autoRefresh$: Observable<boolean>;
  constructor(
    private endpointsService: EndpointsService,
    private autoRefreshService: AutoRefreshService
  ) {
    this.autoRefresh$ = this.autoRefreshService.autoRefresh$;
  }

  status;
  proxyInfo;
  navbarOpen = false;

  ngOnInit() {
    this.autoRefresh$.subscribe((_) => this.autoRefresh = _);
    this.autoRefreshService.loadData();
    this.autoRefreshService.initRefreshInterval();
    this.endpointsService.getStatus()
      .subscribe((_) => {
        this.status = _.socksProxyRunning;
        this.proxyInfo = {
          version: _.version,
          port: _.socksPort
        };
      });
  }

  changeAutoRefresh() {
    this.autoRefreshService.changeAutoRefresh();
  }


  loadData() {
    this.autoRefreshService.loadData();
  }

  clearAll() {
    this.endpointsService.clearEndpoints();
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }


}
