import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuloInventarioRoutingModule } from './modulo-inventario-routing.module';
import { RutaBodegaComponent } from './rutas/ruta-bodega/ruta-bodega.component';
import { RutaReporteComponent } from './rutas/ruta-reporte/ruta-reporte.component';


@NgModule({
  // Componentes
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
