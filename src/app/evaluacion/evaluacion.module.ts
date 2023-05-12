import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EvaluacionRoutingModule } from './evaluacion-routing.module';
import { AsignaturaComponent } from './pages/asignatura/asignatura.component';
import { RasgoComponent } from './pages/rasgo/rasgo.component';
import { ActividadComponent } from './pages/actividad/actividad.component';
import { EvaluacionComponent } from './pages/evaluacion/evaluacion.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NewAsignaturaComponent } from './pages/new-asignatura/new-asignatura.component';
import { NewRasgoComponent } from './pages/new-rasgo/new-rasgo.component';

@NgModule({
  declarations: [
    AsignaturaComponent,
    RasgoComponent,
    ActividadComponent,
    EvaluacionComponent,
    NewAsignaturaComponent,
    NewRasgoComponent
  ],
  imports: [
    CommonModule,
    EvaluacionRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class EvaluacionModule { }
