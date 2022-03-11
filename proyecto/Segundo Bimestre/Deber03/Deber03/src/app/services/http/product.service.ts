import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { map, Observable } from "rxjs"
import {ProductInterface} from "./interfaces/product.interface";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  // CREATE
  createProduct(storeID: string, product: ProductInterface) {
    const url = environment.API_URL + '/store/' + storeID + '/product';
    return this.http.post(url, product)
      .pipe(map( (data) =>
        data as ProductInterface
      ));
  }

  // READ
  readAllProducts(storeID: string) {
    const url = environment.API_URL + '/store/' + storeID + '/product';
    return this.http.get(url)
      .pipe(map( (data) =>
        data as ProductInterface[]
      ));
  }

  readProductByID(storeID: string, productID: string){
    const url = environment.API_URL + '/store/' + storeID + '/product/' + productID;
    return this.http.get(url)
      .pipe(map( (data) =>
        data as ProductInterface
      ));
  }

  // UPDATE
  updateProductByID(storeID: string, productID: string, product: ProductInterface) {
    const url = environment.API_URL + '/store/' + storeID + '/product/' + productID;
    return this.http.patch(url, product)
      .pipe(map( (data) =>
        data as ProductInterface
      ));
  }

  // DELETE
  deleteProductByID(storeID: string, productID: string) {
    const url = environment.API_URL + '/store/' + storeID + '/product/' + productID;
    return this.http.delete(url)
      .pipe(map( (data) =>
        data as ProductInterface
      ));
  }

}
