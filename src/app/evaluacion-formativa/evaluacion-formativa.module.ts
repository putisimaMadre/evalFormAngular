import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EvaluacionFormativaRoutingModule } from './evaluacion-formativa-routing.module';
import { MainComponent } from './pages/main/main.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    EvaluacionFormativaRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class EvaluacionFormativaModule { }
