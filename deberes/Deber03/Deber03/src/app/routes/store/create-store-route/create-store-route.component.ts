import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {DatePipe} from "@angular/common";
import {StoreInterface} from "../../../services/http/interfaces/store.interface";
import {StoreService} from "../../../services/http/store.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-store-route',
  templateUrl: './create-store-route.component.html',
  styleUrls: ['./create-store-route.component.scss'],
  providers: [DatePipe]
})
export class CreateStoreRouteComponent implements OnInit {

  constructor(
    private readonly storeService: StoreService,
    private readonly formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private readonly router: Router,
  ) {
    this.today = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  }

  formStore?: FormGroup;
  today?: any;

  ngOnInit(): void {
    this.setUpForm();
    this.listenChanges();
  }

  validationOptions = {
    nombreMinLength: 5,
    nombreMaxLength: 30,
    direccionMinLength: 5,
    direccionMaxLength: 100,
    areaMin: 80,
    areaMax: 1000,
    estrellasMin: 1,
    estrellasMax: 5,
  }

  score = this.validationOptions.estrellasMin;

  setUpForm() {
    this.formStore = this.formBuilder.group({
      nombre: new FormControl({
        value: '',
        disabled: false,
      }, [
        Validators.required,
        Validators.minLength(this.validationOptions.nombreMinLength),
        Validators.maxLength(this.validationOptions.nombreMaxLength),
      ]),
      direccion: new FormControl({
        value: '',
        disabled: false,
      }, [
        Validators.required,
        Validators.minLength(this.validationOptions.direccionMinLength),
        Validators.maxLength(this.validationOptions.direccionMaxLength),
      ]),
      area: new FormControl({
        value: '',
        disabled: false,
      }, [
        Validators.required,
        Validators.min(this.validationOptions.areaMin),
        Validators.max(this.validationOptions.areaMax),
      ]),
      fechaApertura: new FormControl({
        value: this.today,
      }, [
        Validators.required,
      ]),
      estrellas: new FormControl({
        value: this.score,
        disabled: false,
      }, [
        Validators.required,
        Validators.min(this.validationOptions.estrellasMin),
        Validators.max(this.validationOptions.estrellasMax),
      ]),
    });
  }

  createStore() {
    if (this.formStore) {
      // Get values from Form
      const store: StoreInterface = {
        nombre: this.formStore.get('nombre')?.value,
        direccion: this.formStore.get('direccion')?.value,
        area: this.formStore.get('area')?.value,
        fechaApertura: this.formStore.get('fechaApertura')?.value,
        estrellas: this.formStore.get('estrellas')?.value,
      }
      // Create Store
      this.storeService.createStore(store)
        .subscribe({
          next: (data) => {
            alert('Registro creado!');
            const url = ['/store'];
            this.router.navigate(url);
          },
          error: (error) => {
            alert(error);
          }
        });
    }
  }

  listenChanges() {
    const changes = this.formStore?.get('estrellas')?.valueChanges;
    changes!.subscribe({
      next: (newScore) => {
        this.score = newScore;
      }
    });
  }

}
