import { Component, OnInit } from '@angular/core';
import {StoreService} from "../../../services/http/store.service";
import {StoreInterface} from "../../../services/http/interfaces/store.interface";

@Component({
  selector: 'app-store-route',
  templateUrl: './store-route.component.html',
  styleUrls: ['./store-route.component.scss']
})
export class StoreRouteComponent implements OnInit {

  constructor(
    private readonly storeService: StoreService,
  ) { }

  listaStore: StoreInterface[] = [];

  ngOnInit(): void {
    this.storeService.readAllStores()
      .subscribe({
        next: (data) => {
          this.listaStore = data;
        },
        error: (error) => {
          console.error(error);
        }
      });
  }

}
