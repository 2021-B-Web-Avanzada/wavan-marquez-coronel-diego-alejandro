import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {StoreRouteComponent} from "./routes/store/store-route/store-route.component";
import {CreateStoreRouteComponent} from "./routes/store/create-store-route/create-store-route.component";
import {UpdateStoreRouteComponent} from "./routes/store/update-store-route/update-store-route.component";
import {ProductRouteComponent} from "./routes/product/product-route/product-route.component";
import {CreateProductRouteComponent} from "./routes/product/create-product-route/create-product-route.component";
import {UpdateProductRouteComponent} from "./routes/product/update-product-route/update-product-route.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'store',
    pathMatch: 'full'
  },
  {
    path: 'store',
    component: StoreRouteComponent,
  },
  {
    path: 'store/crearStore',
    component: CreateStoreRouteComponent,
  },
  {
    path: 'store/:storeID/editarStore',
    component: UpdateStoreRouteComponent,
  },
  {
    path: 'store/:storeID/product',
    component: ProductRouteComponent,
  },
  {
    path: 'store/:storeID/product/crearProduct',
    component: CreateProductRouteComponent,
  },
  {
    path: 'store/:storeID/product/:productID/editarProducto',
    component: UpdateProductRouteComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
