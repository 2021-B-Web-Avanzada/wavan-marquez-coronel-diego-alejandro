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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
