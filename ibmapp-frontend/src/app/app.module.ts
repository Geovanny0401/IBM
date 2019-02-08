import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { TarjetaComponent } from './pages/tarjeta/tarjeta.component';
import { ConsumoComponent } from './pages/consumo/consumo.component';
import { MaterialModule } from './material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ClienteEdicionComponent } from './pages/cliente/cliente-edicion/cliente-edicion.component';
import { AsesorComponent } from './pages/asesor/asesor.component';
import { DialogoComponent } from './pages/asesor/dialogo/dialogo.component';
import { TarjetaEdicionComponent } from './pages/tarjeta/tarjeta-edicion/tarjeta-edicion.component';
import { IgxSnackbarModule, IgxMaskModule, IgxInputGroupModule } from "igniteui-angular";

@NgModule({
  declarations: [
    AppComponent,
    ClienteComponent,
    TarjetaComponent,
    ConsumoComponent,
    ClienteEdicionComponent,
    AsesorComponent,
    DialogoComponent,
    TarjetaEdicionComponent
  ],
  entryComponents: [DialogoComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    IgxSnackbarModule,
    IgxMaskModule,
    IgxInputGroupModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
