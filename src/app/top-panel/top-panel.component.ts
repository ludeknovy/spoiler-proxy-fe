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
  version;
  port;

  ngOnInit() {
    this.endpointsService.getStatus()
      .subscribe((_) => {
        this.status = _.socksProxyRunning;
        this.version = _.version;
        this.port = _.socksPort;
      });
  }

}
