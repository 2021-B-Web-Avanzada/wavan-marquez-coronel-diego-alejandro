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
import {AuthService} from './servicios/auth/auth.service';
import {EstaLogeadoGuard} from './servicios/auth/esta-logeado.guard';
import {EsAdministradorGuard} from './servicios/auth/es-administrador.guard';
import {BannerImagenesModule} from './componentes/banner-imagenes/banner-imagenes.module';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RutaUsuarioPerfilComponent } from './rutas/ruta-usuario-perfil/ruta-usuario-perfil.component';

@NgModule({
  // Componentes
  declarations: [
    AppComponent,
    RutaLoginComponent,
    RutaNotFoundComponent,
    RutaForbiddenComponent,
    RutaInicioComponent,
    RutaUsuarioComponent,
    RutaPostComponent,
    RutaAppComponent,
    RutaUsuarioPerfilComponent
  ],
  // Modulos Importados
  imports: [
    // app.module.ts
    BrowserModule,
    AppRoutingModule,
    BannerImagenesModule,
    HttpClientModule,
    FormsModule, // Template Driven Forms
    ReactiveFormsModule,
  ],
  // Servicios
  providers: [
    // AuthService,
    EstaLogeadoGuard,
    EsAdministradorGuard
  ],
  // Componente principal (aqui es donde empieza toodo)
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
