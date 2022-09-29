import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';

export class HistoryItem {
  searchText!: string;
  searchType!: string;
}

@Injectable({
  providedIn: 'root',
})
export class RefreshService {
  private storage: Storage;

  constructor() {
    this.storage = window.localStorage;
  }

  private refresh: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  public getRefresh(): Observable<boolean> {
    return this.refresh.asObservable();
  }

  public setRefresh(value: boolean): void {
    this.refresh.next(value);
  }
}
