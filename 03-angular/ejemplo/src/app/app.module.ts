import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RutaLoginComponent } from './ruta-login/ruta-login.component';
import { RutaForbiddenComponent } from './ruta-login/ruta-forbidden/ruta-forbidden.component';
import { RutaNotFoundComponent } from './ruta-login/ruta-not-found/ruta-not-found.component';
import { RutaInicioComponent } from './ruta-login/ruta-inicio/ruta-inicio.component';
import { RutaUsuarioComponent } from './ruta-login/ruta-usuario/ruta-usuario.component';
import { RutaPostComponent } from './ruta-login/ruta-post/ruta-post.component';
import { RutaAppComponent } from './ruta-login/ruta-app/ruta-app.component';
import {AuthService} from "./services/auth/auth.service";
import {EstaLogeadoGuard} from "./esta-logeado.guard";
import {EsAdministradorGuard} from "./es-administrador.guard";
import { RutaReporteComponent } from './ruta-login/ruta-reporte/ruta-reporte.component';
import { RutaBodegaComponent } from './ruta-login/ruta-bodega/ruta-bodega.component';

@NgModule({
  declarations: [
    AppComponent,
    RutaLoginComponent,
    RutaForbiddenComponent,
    RutaNotFoundComponent,
    RutaInicioComponent,
    RutaUsuarioComponent,
    RutaPostComponent,
    RutaAppComponent,
    RutaReporteComponent,
    RutaBodegaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

  ],
  //Servicios
  providers: [
    AuthService,
    EstaLogeadoGuard,
    EsAdministradorGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
