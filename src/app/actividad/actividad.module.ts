import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActividadRoutingModule } from './actividad-routing.module';
import { ActividadesComponent } from './pages/actividades/actividades.component';
import { NewActComponent } from './pages/new-act/new-act.component';
import { NombreActComponent } from './pages/nombre-act/nombre-act.component';


@NgModule({
  declarations: [
    ActividadesComponent,
    NewActComponent,
    NombreActComponent
  ],
  imports: [
    CommonModule,
    ActividadRoutingModule
  ]
})
export class ActividadModule { }
