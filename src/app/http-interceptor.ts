import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { EndpointsApiService } from './endpoints.api.service';
import { environment } from '../environments/environment';

@Injectable()
export class RequestHttpInterceptor implements HttpInterceptor {
  constructor(public projectService: EndpointsApiService) { }
  private baseUrl = environment.baseUrl;
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      url: `${this.baseUrl}/${request.url}`,
    });
    return next.handle(request);
  }
}
