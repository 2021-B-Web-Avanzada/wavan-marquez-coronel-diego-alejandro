import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CurrencyPipe, DatePipe} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../../services/http/product.service";
import {ProductInterface} from "../../../services/http/interfaces/product.interface";

@Component({
  selector: 'app-create-product-route',
  templateUrl: './create-product-route.component.html',
  styleUrls: ['./create-product-route.component.scss'],
  providers: [DatePipe, CurrencyPipe],
})
export class CreateProductRouteComponent implements OnInit {

  constructor(
    private readonly productService: ProductService,
    private readonly formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
  ) {
    this.today = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  }

  formProduct?: FormGroup;
  today?: any;
  storeID = '';

  ngOnInit(): void {
    // Get StoreID
    const params = this.activatedRoute.params;
    params.subscribe({
      next: (params) => {
        this.storeID = params['storeID'];
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
    this.formProduct = this.formBuilder.group({
      nombre: new FormControl({
        value: '',
        disabled: false,
      }, [
        Validators.required,
        Validators.minLength(this.validationOptions.nombreMinLength),
        Validators.maxLength(this.validationOptions.nombreMaxLength),
      ]),
      marca: new FormControl({
        value: '',
        disabled: false,
      }, [
        Validators.required,
        Validators.minLength(this.validationOptions.marcaMinLength),
        Validators.maxLength(this.validationOptions.marcaMaxLength),
      ]),
      unidad: new FormControl({
        value: '',
        disabled: false,
      }, [
        Validators.required,
        Validators.min(this.validationOptions.unidadMin),
        Validators.max(this.validationOptions.unidadMax),
      ]),
      fechaAdquisicion: new FormControl({
        value: this.today,
      }, [
        Validators.required,
      ]),
      precio: new FormControl({
        value: '',
        disabled: false,
      }, [
        Validators.required,
        Validators.min(this.validationOptions.precioMin),
        Validators.max(this.validationOptions.precioMax),
      ]),
    });
  }

  createProduct() {
    if (this.formProduct) {
      // Get values from Form
      const product: ProductInterface = {
        nombre: this.formProduct.get('nombre')?.value,
        marca: this.formProduct.get('marca')?.value,
        unidad: this.formProduct.get('unidad')?.value,
        fechaAdquisicion: this.formProduct.get('fechaAdquisicion')?.value,
        precio: this.formProduct.get('precio')?.value,
        storeID: this.storeID,
      }
      // Create Store
      this.productService.createProduct(this.storeID, product)
        .subscribe({
          next: (data) => {
            alert('Registro creado!');
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
