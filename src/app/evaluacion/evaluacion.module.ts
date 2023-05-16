import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EvaluacionRoutingModule } from './evaluacion-routing.module';
import { AsignaturaComponent } from './pages/asignatura/asignatura.component';
import { RasgoComponent } from './pages/rasgo/rasgo.component';
import { ActividadComponent } from './pages/actividad/actividad.component';
import { EvaluacionComponent } from './pages/evaluacion/evaluacion.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewAsignaturaComponent } from './pages/new-asignatura/new-asignatura.component';
import { NewRasgoComponent } from './pages/new-rasgo/new-rasgo.component';
import { RasgoResumenComponent } from './pages/rasgo-resumen/rasgo-resumen.component';
import { NewActividadComponent } from './pages/new-actividad/new-actividad.component';
import { CalificacionComponent } from './pages/calificacion/calificacion.component';
import { NewCalificacionComponent } from './pages/new-calificacion/new-calificacion.component';

@NgModule({
  declarations: [
    AsignaturaComponent,
    RasgoComponent,
    ActividadComponent,
    EvaluacionComponent,
    NewAsignaturaComponent,
    NewRasgoComponent,
    RasgoResumenComponent,
    NewActividadComponent,
    CalificacionComponent,
    NewCalificacionComponent
  ],
  imports: [
    CommonModule,
    EvaluacionRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class EvaluacionModule { }
