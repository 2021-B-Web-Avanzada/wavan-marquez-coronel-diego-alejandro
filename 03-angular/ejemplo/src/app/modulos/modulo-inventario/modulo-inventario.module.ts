import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuloInventarioRoutingModule } from './modulo-inventario-routing.module';
import {RutaBodegaComponent} from "../../ruta-login/ruta-bodega/ruta-bodega.component";
import {RutaReporteComponent} from "../../ruta-login/ruta-reporte/ruta-reporte.component";


@NgModule({
  declarations: [
    RutaBodegaComponent,
    RutaReporteComponent
  ],
  imports: [
    CommonModule,
    ModuloInventarioRoutingModule
  ]
})
export class ModuloInventarioModule { }
