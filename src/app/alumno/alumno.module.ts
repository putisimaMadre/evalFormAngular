import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlumnoRoutingModule } from './alumno-routing.module';
import { AlumnosComponent } from './pages/alumnos/alumnos.component';
import { NewAComponent } from './pages/new-a/new-a.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlumnosInputComponent } from './pages/alumnos-input/alumnos-input.component';


@NgModule({
  declarations: [
    AlumnosComponent,
    NewAComponent,
    AlumnosInputComponent
  ],
  imports: [
    CommonModule,
    AlumnoRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    
  ]
})
export class AlumnoModule { }
