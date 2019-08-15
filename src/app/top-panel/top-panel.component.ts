import { Component, OnInit } from '@angular/core';
import { EndpointsService } from '../endpoints.service';

@Component({
  selector: 'app-top-panel',
  templateUrl: './top-panel.component.html',
  styleUrls: ['./top-panel.component.css']
})
export class TopPanelComponent implements OnInit {

  constructor(
    private endpointsService: EndpointsService,
  ) {
  }

  status;
  proxyInfo;

  ngOnInit() {
    this.endpointsService.getStatus()
      .subscribe((_) => {
        this.status = _.socksProxyRunning;
        this.proxyInfo = {
          version: _.version,
          port: _.socksPort
        };
      });
  }

}
