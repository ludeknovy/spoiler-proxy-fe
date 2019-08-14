import { Component, OnInit } from '@angular/core';
import { EndpointsService } from '../endpoints.service';

@Component({
  selector: 'app-endpoints',
  templateUrl: './endpoints.component.html',
  styleUrls: ['./endpoints.component.css', '../../shared-styles.scss']
})
export class EndpointsComponent implements OnInit {

  constructor(
    private endpointsService: EndpointsService,

  ) { }

  endpoints = [{
    id: 123132,
    address: 'direct.cz',
    status: 'ok',
    connections: 5
  }, {
    id: 1232,
    address: 'google.com',
    status: 'ok',
    connections: 3
  }];

  ngOnInit() {
    this.endpointsService.fetchEndpointList();
  }

}
