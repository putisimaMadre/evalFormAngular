import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlumnoRoutingModule } from './alumno-routing.module';
import { AlumnosComponent } from './pages/alumnos/alumnos.component';
import { NewAComponent } from './pages/new-a/new-a.component';
import { MaterialModule } from '../material/material.module';
import { DataTablesModule } from "angular-datatables";
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AlumnosComponent,
    NewAComponent
  ],
  imports: [
    CommonModule,
    AlumnoRoutingModule,
    MaterialModule,
    DataTablesModule,
    ReactiveFormsModule
  ]
})
export class AlumnoModule { }
