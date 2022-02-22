import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs"
import { environment } from "../../../environments/environment";
import {StoreInterface} from "./interfaces/store.interface";

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private http: HttpClient) { }

  // CREATE
  createStore(store: StoreInterface) {
    const url = environment.API_URL + '/store';
    return this.http.post(url, store)
      .pipe(map((data) =>
        data as StoreInterface
      ));
  }

  // READ
  readAllStores() {
    const url = environment.API_URL + '/store';
    return this.http.get(url)
      .pipe(map((data) =>
        data as StoreInterface[]
      ));
  }

  readStoreByID(storeID: string) {
    const url = environment.API_URL + '/store/' + storeID;
    return this.http.get(url)
      .pipe(map((data) =>
        data as StoreInterface
      ));
  }

  // UPDATE
  updateStoreByID(storeID: string, store: StoreInterface) {
    const url = environment.API_URL + '/store/' + storeID;
    return this.http.patch(url, store)
      .pipe(map((data) =>
        data as StoreInterface
      ));
  }

  // DELETE
  deleteStoreByID(storeID: string) {
    const url = environment.API_URL + '/store/' + storeID;
    return this.http.delete(url)
      .pipe(map((data) =>
        data as StoreInterface
      ));
  }

}
