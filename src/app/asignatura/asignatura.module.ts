import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AsignaturaRoutingModule } from './asignatura-routing.module';
import { AsignaturasComponent } from './pages/asignaturas/asignaturas.component';
import { NewAComponent } from './pages/new-a/new-a.component';


@NgModule({
  declarations: [
    AsignaturasComponent,
    NewAComponent
  ],
  imports: [
    CommonModule,
    AsignaturaRoutingModule
  ]
})
export class AsignaturaModule { }
