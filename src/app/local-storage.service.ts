import { Injectable, Inject } from '@angular/core';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
  ) { }

  updateStorage(key, value): void {
    this.storage.set(key, value);
  }

  getFromStorage(key) {
    const strg = this.storage.get(key);
    return strg;
  }

}
