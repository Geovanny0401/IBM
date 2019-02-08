import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { ClienteEdicionComponent } from './pages/cliente/cliente-edicion/cliente-edicion.component';
import { AsesorComponent } from './pages/asesor/asesor.component';
import { TarjetaComponent } from './pages/tarjeta/tarjeta.component';
import { TarjetaEdicionComponent } from './pages/tarjeta/tarjeta-edicion/tarjeta-edicion.component';

const routes: Routes = [
  {path: 'cliente', component : ClienteComponent, children: [
    {path: 'nuevo', component : ClienteEdicionComponent},
    {path: 'edicion/:id', component : ClienteEdicionComponent}
  ]},
  { path: 'tarjeta', component: TarjetaComponent, children: [
    {path: 'nuevo', component : TarjetaEdicionComponent},
    {path: 'edicion/:id', component : TarjetaEdicionComponent}
  ]},
  { path: 'asesor', component: AsesorComponent},
  {path: '', redirectTo: 'cliente', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
