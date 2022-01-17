import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerImagenesComponent } from './banner-imagenes/banner-imagenes.component';



@NgModule({
  declarations: [ // banner-imagenes.module.ts
    BannerImagenesComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    BannerImagenesComponent
  ]
})
export class BannerImagenesModule { }
