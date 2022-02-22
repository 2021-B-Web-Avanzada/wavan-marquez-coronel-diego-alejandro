import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreComponent } from './components/store/store.component';
import { StoreRouteComponent } from './routes/store/store-route/store-route.component';
import { ProductComponent } from './components/product/product.component';
import {HttpClientModule} from "@angular/common/http";
import { CreateStoreRouteComponent } from './routes/store/create-store-route/create-store-route.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ProductRouteComponent } from './routes/product/product-route/product-route.component';
import { CreateProductRouteComponent } from './routes/product/create-product-route/create-product-route.component';
import { UpdateStoreRouteComponent } from './routes/store/update-store-route/update-store-route.component';
import { UpdateProductRouteComponent } from './routes/product/update-product-route/update-product-route.component';
import {CurrencyPipe, DatePipe} from "@angular/common";

@NgModule({
  declarations: [
    AppComponent,
    StoreComponent,
    StoreRouteComponent,
    ProductComponent,
    CreateStoreRouteComponent,
    ProductRouteComponent,
    CreateProductRouteComponent,
    UpdateStoreRouteComponent,
    UpdateProductRouteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [DatePipe, CurrencyPipe],
  bootstrap: [AppComponent]
})
export class AppModule {


}
