import {Component, Input, OnInit} from '@angular/core';
import {StoreService} from "../../../services/http/store.service";
import {StoreInterface} from "../../../services/http/interfaces/store.interface";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {DatePipe} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-update-store-route',
  templateUrl: './update-store-route.component.html',
  styleUrls: ['./update-store-route.component.scss'],
  providers: [DatePipe],
})
export class UpdateStoreRouteComponent implements OnInit {

  constructor(
    private readonly storeService: StoreService,
    private readonly formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
  ) {
    this.today = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  }

  formUpdateStore?: FormGroup;
  today?: any;
  store?: StoreInterface;
  storeID = '';

  ngOnInit(): void {
    const params = this.activatedRoute.params;
    params.subscribe({
      next: (params) => {
        this.storeID = params['storeID'];
        this.readStore();
      }
    });
  }

  readStore() {
    this.storeService.readStoreByID(this.storeID)
      .subscribe({
        next: (data) => {
          this.store = data;
          this.setUpForm();
          this.score = this.store!.estrellas;
          this.listenChanges();
        }
      });
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
    this.formUpdateStore = this.formBuilder.group({
      nombre: new FormControl({
        value: this.store!.nombre,
        disabled: false,
      }, [
        Validators.required,
        Validators.minLength(this.validationOptions.nombreMinLength),
        Validators.maxLength(this.validationOptions.nombreMaxLength),
      ]),
      direccion: new FormControl({
        value: this.store!.direccion,
        disabled: false,
      }, [
        Validators.required,
        Validators.minLength(this.validationOptions.direccionMinLength),
        Validators.maxLength(this.validationOptions.direccionMaxLength),
      ]),
      area: new FormControl({
        value: this.store!.area,
        disabled: false,
      }, [
        Validators.required,
        Validators.min(this.validationOptions.areaMin),
        Validators.max(this.validationOptions.areaMax),
      ]),
      fechaApertura: new FormControl({
        value: this.store!.fechaApertura,
      }, [
        Validators.required,
      ]),
      estrellas: new FormControl({
        value: this.store!.estrellas,
        disabled: false,
      }, [
        Validators.required,
        Validators.min(this.validationOptions.estrellasMin),
        Validators.max(this.validationOptions.estrellasMax),
      ]),
    });
  }

  updateStore() {
    if (this.formUpdateStore) {
      const storeUpdated: StoreInterface = {
        nombre: this.formUpdateStore.get('nombre')?.value,
        direccion: this.formUpdateStore.get('direccion')?.value,
        area: this.formUpdateStore.get('area')?.value,
        fechaApertura: this.formUpdateStore.get('fechaApertura')?.value,
        estrellas: this.formUpdateStore.get('estrellas')?.value,
      }
      this.storeService.updateStoreByID(this.store!._id as string, storeUpdated)
        .subscribe({
          next: (data) => {
            alert('Se han actualizado los datos!');
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
    const changes = this.formUpdateStore?.get('estrellas')?.valueChanges;
    changes!.subscribe({
      next: (newScore) => {
        this.score = newScore;
      }
    });
  }
}
