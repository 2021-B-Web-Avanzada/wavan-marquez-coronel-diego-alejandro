import { Component, OnInit } from '@angular/core';
import {ProductInterface} from "../../../services/http/interfaces/product.interface";
import {ProductService} from "../../../services/http/product.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-product-route',
  templateUrl: './product-route.component.html',
  styleUrls: ['./product-route.component.scss']
})
export class ProductRouteComponent implements OnInit {

  constructor(
    private readonly productService: ProductService,
    private readonly activatedRoute: ActivatedRoute,
  ) { }

  listaProductos: ProductInterface[] = [];
  storeID = '';

  ngOnInit(): void {
    const params = this.activatedRoute.params;
    params.subscribe({
      next: (params) => {
        this.storeID = params['storeID'];
        this.readAllProductos();
      }
    });
  }

  readAllProductos() {
    this.productService.readAllProducts(this.storeID)
      .subscribe({
        next: (data) => {
          this.listaProductos = data;
        },
        error: (error) => {
          console.error(error);
        }
      });
  }

}
