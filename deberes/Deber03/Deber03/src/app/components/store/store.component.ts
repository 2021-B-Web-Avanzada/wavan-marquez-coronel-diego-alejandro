import {Component, Input, OnInit} from '@angular/core';
import {StoreInterface} from "../../services/http/interfaces/store.interface";
import {StoreService} from "../../services/http/store.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {

  constructor(
    private readonly storeService: StoreService,
    private readonly router: Router,
  ) { }

  @Input() store?: StoreInterface;

  ngOnInit(): void {
  }

  readProducts() {
    const url = ['/store', this.store!._id, 'product'];
    this.router.navigate(url);
  }

  updateStore() {
      const url = ['/store', this.store!._id, 'editarStore'];
      this.router.navigate(url);
  }

  deleteStore() {
    this.storeService.deleteStoreByID(this.store!._id as string)
      .subscribe({
        next: (data) => {
          alert('Registro eliminado!');
          window.location.reload();
        },
        error: (error) => {
          alert(error);
        }
      });
  }
}
