import { Component, OnInit } from '@angular/core';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-evaluacion',
  templateUrl: './evaluacion.component.html',
  styleUrls: ['./evaluacion.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {showError: true},
    },
  ],
})
export class EvaluacionComponent implements OnInit{

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
  }

  formGroupAsignatura = this.formBuilder.group({
    
  });

  formGroupEvaluacion = this.formBuilder.group({
   
  });

  formGroupActividad = this.formBuilder.group({
   
  })
}
