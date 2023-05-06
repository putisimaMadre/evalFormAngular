import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlumnoRoutingModule } from './alumno-routing.module';
import { AlumnosComponent } from './pages/alumnos/alumnos.component';
import { NewAComponent } from './pages/new-a/new-a.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from "angular-datatables";
import { HttpClientModule } from "@angular/common/http";


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
    ReactiveFormsModule,
    FormsModule,
    DataTablesModule,
    HttpClientModule,
    MaterialModule
  ]
})
export class AlumnoModule { }
