import { Injectable } from '@angular/core';
import { interval, BehaviorSubject } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { EndpointsService } from './endpoints.service';


@Injectable({
  providedIn: 'root'
})
export class AutoRefreshService {

  private autoRefresh = new BehaviorSubject<boolean>(true);
  public autoRefresh$ = this.autoRefresh.asObservable();

  refreshInterval;
  shouldContinue: boolean;
  constructor(
    private endpointsService: EndpointsService,
    private localStorageService: LocalStorageService
  ) { }

  initRefreshInterval() {
    const storageValue = this.getAutoRefreshFromStorage();
    this.autoRefresh.next(storageValue);
    this.setRefreshInterval(this.autoRefresh.value);
  }

  setRefreshInterval(shouldSetInterval: boolean) {
    if (shouldSetInterval) {
      this.refreshInterval = interval(5000).subscribe(() => {
        return this.loadData();
      });
    } else {
      if (this.refreshInterval) {
        this.refreshInterval.unsubscribe();
      }
    }
  }

  loadData() {
    this.endpointsService.fetchEndpointList();
    this.endpointsService.getConnectionGraphGrouped();
  }

  private getAutoRefreshFromStorage() {
    const value = this.localStorageService.getFromStorage('autoRefresh');
    if (value === null) {
      return true;
    }
    return value;
  }

  changeAutoRefresh() {
    const newAutoRefreshValue = !this.autoRefresh.value;
    this.autoRefresh.next(newAutoRefreshValue);
    this.localStorageService.updateStorage('autoRefresh', newAutoRefreshValue);
    this.setRefreshInterval(newAutoRefreshValue);
  }

  pause() {
    const isAutoRefreshOn = this.autoRefresh.value;
    if (isAutoRefreshOn) {
      this.changeAutoRefresh();
      this.shouldContinue = true;
    }
  }

  continue() {
    console.log("continue")
    if (this.shouldContinue) {
      this.changeAutoRefresh();
      this.shouldContinue = false;
      this.loadData();
    }
  }

}
