import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RutaLoginComponent} from "./ruta-login/ruta-login.component";
import {RutaForbiddenComponent} from "./ruta-login/ruta-forbidden/ruta-forbidden.component";
import {RutaNotFoundComponent} from "./ruta-login/ruta-not-found/ruta-not-found.component";
import {RutaInicioComponent} from "./ruta-login/ruta-inicio/ruta-inicio.component";
import {RutaAppComponent} from "./ruta-login/ruta-app/ruta-app.component";
import {RutaUsuarioComponent} from "./ruta-login/ruta-usuario/ruta-usuario.component";
import {RutaPostComponent} from "./ruta-login/ruta-post/ruta-post.component";
import {EstaLogeadoGuard} from "./esta-logeado.guard";
import {EsAdministradorGuard} from "./es-administrador.guard";
import {RutaBodegaComponent} from "./ruta-login/ruta-bodega/ruta-bodega.component";
import {RutaReporteComponent} from "./ruta-login/ruta-reporte/ruta-reporte.component";
// login
// inicio
// app
    // usuario
    // post
// configuracion
    //
const routes: Routes = [
  {
    path: 'login',
    component: RutaLoginComponent,
  },
  {
    path: 'forbidden',
    component: RutaForbiddenComponent,
  },

  {
    path: 'not-found',
    component: RutaNotFoundComponent,
  },
  {
    path: 'inicio',
    canActivate: [ EstaLogeadoGuard ],
    component: RutaInicioComponent,
  },
  {
    path: 'app',
    component: RutaAppComponent,
    children: [
      {
        path: 'usuario',
        component: RutaUsuarioComponent,
      },
      {
        path: 'post',
        component: RutaPostComponent,
        canActivate: [EsAdministradorGuard]
      },
      {
        path: 'lazy-inventario',
        loadChildren: () => import('./modulos/modulo-inventario/modulo-inventario.module')
          .then(m => m.ModuloInventarioModule)
      },
      { // modulo-inventario-routing.module.ts
        path: 'bodega',
        component: RutaBodegaComponent
      },
      {
        path: 'reporte',
        component: RutaReporteComponent
      },
      {
        path: '',
        redirectTo: 'bodega',
        pathMatch: 'full'
      },
    ]
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path : '**',
    component: RutaNotFoundComponent
  }
];


@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    {useHash:true}

  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
