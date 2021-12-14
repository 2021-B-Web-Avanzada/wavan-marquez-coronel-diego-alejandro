import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RutaLoginComponent} from "./ruta-login/ruta-login.component";
import {RutaForbiddenComponent} from "./ruta-login/ruta-forbidden/ruta-forbidden.component";
import {RutaNotFoundComponent} from "./ruta-login/ruta-not-found/ruta-not-found.component";
import {RutaInicioComponent} from "./ruta-login/ruta-inicio/ruta-inicio.component";
import {RutaAppComponent} from "./ruta-login/ruta-app/ruta-app.component";
import {RutaUsuarioComponent} from "./ruta-login/ruta-usuario/ruta-usuario.component";
import {RutaPostComponent} from "./ruta-login/ruta-post/ruta-post.component";
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
        component: RutaPostComponent
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
