import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CurrencyPipe, DatePipe} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../../services/http/product.service";
import {ProductInterface} from "../../../services/http/interfaces/product.interface";

@Component({
  selector: 'app-update-product-route',
  templateUrl: './update-product-route.component.html',
  styleUrls: ['./update-product-route.component.scss'],
  providers: [DatePipe, CurrencyPipe]
})
export class UpdateProductRouteComponent implements OnInit {

  constructor(
    private readonly productService: ProductService,
    private readonly formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
  ) {
    this.today = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  }

  formUpdateProduct?: FormGroup;
  today?: any;
  product?: ProductInterface;
  storeID = '';
  productID = '';

  ngOnInit(): void {
    const params = this.activatedRoute.params;
    params.subscribe({
      next: (params) => {
        this.storeID = params['storeID'];
        this.productID = params['productID'];
        this.readProduct();
      }
    });
  }

  readProduct() {
    this.productService.readProductByID(this.storeID, this.productID)
      .subscribe({
        next: (data) => {
          this.product = data;
          this.setUpForm();
        }
      });
  }

  validationOptions = {
    nombreMinLength: 5,
    nombreMaxLength: 30,
    marcaMinLength: 5,
    marcaMaxLength: 100,
    unidadMin: 1,
    unidadMax: 1000,
    precioMin: 0.01,
    precioMax: 999,
  }

  setUpForm() {
    this.formUpdateProduct = this.formBuilder.group({
      nombre: new FormControl({
        value: this.product!.nombre,
        disabled: false,
      }, [
        Validators.required,
        Validators.minLength(this.validationOptions.nombreMinLength),
        Validators.maxLength(this.validationOptions.nombreMaxLength),
      ]),
      marca: new FormControl({
        value: this.product!.marca,
        disabled: false,
      }, [
        Validators.required,
        Validators.minLength(this.validationOptions.marcaMinLength),
        Validators.maxLength(this.validationOptions.marcaMaxLength),
      ]),
      unidad: new FormControl({
        value: this.product!.unidad,
        disabled: false,
      }, [
        Validators.required,
        Validators.min(this.validationOptions.unidadMin),
        Validators.max(this.validationOptions.unidadMax),
      ]),
      fechaAdquisicion: new FormControl({
        value: this.product!.fechaAdquisicion,
      }, [
        Validators.required,
      ]),
      precio: new FormControl({
        value: this.product!.precio,
        disabled: false,
      }, [
        Validators.required,
        Validators.min(this.validationOptions.precioMin),
        Validators.max(this.validationOptions.precioMax),
      ]),
    });
  }

  updateProduct() {
    if (this.formUpdateProduct) {
      const productUpdated: ProductInterface = {
        nombre: this.formUpdateProduct.get('nombre')?.value,
        marca: this.formUpdateProduct.get('marca')?.value,
        unidad: this.formUpdateProduct.get('unidad')?.value,
        fechaAdquisicion: this.formUpdateProduct.get('fechaAdquisicion')?.value,
        precio: this.formUpdateProduct.get('precio')?.value,
        storeID: this.storeID,
      }
      this.productService.updateProductByID(this.storeID, this.productID, productUpdated)
        .subscribe({
          next: (data) => {
            alert('Se han actualizado los datos!');
            const url = ['/store', this.storeID, 'product'];
            this.router.navigate(url);
          },
          error: (error) => {
            alert(error);
          }
        });
    }
  }

}
