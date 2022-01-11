import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RutaLoginComponent } from './rutas/ruta-login/ruta-login.component';
import { RutaNotFoundComponent } from './rutas/ruta-not-found/ruta-not-found.component';
import { RutaForbiddenComponent } from './rutas/ruta-forbidden/ruta-forbidden.component';
import { RutaInicioComponent } from './rutas/ruta-inicio/ruta-inicio.component';
import { RutaUsuarioComponent } from './rutas/ruta-usuario/ruta-usuario.component';
import { RutaPostComponent } from './rutas/ruta-post/ruta-post.component';
import { RutaAppComponent } from './rutas/ruta-app/ruta-app.component';
import {AuthService} from "./services/auth/authservice";
import {EstaLogeadoGuard} from "./services/auth/esta-logeado.guard";
import {EsAdministradorGuard} from "./services/auth/esadministrador.guard";
import {BannerImagenesModule} from "./componentes/banner-imagenes/banner-imagenes.module";
import {BannerImagenesComponent} from "./componentes/banner-imagenes/banner-imagenes/banner-imagenes.component";


@NgModule({
  declarations: [
    AppComponent,
    RutaLoginComponent,
    RutaNotFoundComponent,
    RutaForbiddenComponent,
    RutaInicioComponent,
    RutaUsuarioComponent,
    RutaPostComponent,
    RutaAppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BannerImagenesModule
  ],
  //servicios
  providers: [
    AuthService,
    EstaLogeadoGuard,
    EsAdministradorGuard
  ],
  //componente principal
  bootstrap: [AppComponent]
})
export class AppModule { }
