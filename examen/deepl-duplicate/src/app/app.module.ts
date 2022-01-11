import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ButtonTranslateComponent } from './components/button-translate/button-translate.component';
import { TextTraductionComponent } from './components/text-traduction/text-traduction.component';
import { AnuncioComponent } from './components/anuncio/anuncio.component';
import { FooterComponent } from './components/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatButtonModule} from "@angular/material/button";




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ButtonTranslateComponent,
    TextTraductionComponent,
    AnuncioComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatBottomSheetModule,
    MatButtonModule
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
