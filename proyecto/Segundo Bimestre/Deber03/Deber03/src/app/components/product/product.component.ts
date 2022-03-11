import {Component, Input, OnInit} from '@angular/core';
import {ProductInterface} from "../../services/http/interfaces/product.interface";
import {Router} from "@angular/router";
import {ProductService} from "../../services/http/product.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  constructor(
    private readonly productService: ProductService,
    private readonly router: Router,
  ) { }

  @Input() product?: ProductInterface;

  ngOnInit(): void {
  }

  updateProduct() {
    const url = ['/store', this.product!.storeID, 'product', this.product!._id, 'editarProducto'];
    this.router.navigate(url);
  }

  deleteProduct() {
    this.productService.deleteProductByID(this.product!.storeID as string, this.product!._id as string)
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
