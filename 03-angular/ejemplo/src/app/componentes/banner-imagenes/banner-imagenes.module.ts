import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerImagenesComponent } from './banner-imagenes/banner-imagenes.component';



@NgModule({
  declarations: [
    BannerImagenesComponent
  ],
  exports: [
    BannerImagenesComponent
  ],
  imports: [
    CommonModule
  ]
})
export class BannerImagenesModule { }
