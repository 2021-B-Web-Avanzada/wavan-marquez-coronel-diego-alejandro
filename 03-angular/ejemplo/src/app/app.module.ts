import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RutaLoginComponent } from './ruta-login/ruta-login.component';

@NgModule({
  declarations: [
    AppComponent,
    RutaLoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
