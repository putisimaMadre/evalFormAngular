import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, Validators, FormControl, FormGroup} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';

import { MatTableDataSource } from '@angular/material/table'


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

  title = 'form-array';

  //formGroupEvaluacion!: FormGroup
  dataSourcePacks!: MatTableDataSource<any>;
  displayedColumns = ["cantDesde", "precio", "eliminar"]

  //cantDesde = new FormControl('')
  precio = new FormControl('')

  constructor(private formBuilder: FormBuilder,
    private cd: ChangeDetectorRef
    ) {}

  ngOnInit(): void {

    

  }

  formGroupEvaluacion = this.formBuilder.group({
    cantDesde: ['', Validators.required],
    precio: ['', Validators.required],
    promos: this.formBuilder.array([])
  });

  firstFormGroup = this.formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  rasgoFormGroup = this.formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

  get promos() {
    return this.formGroupEvaluacion.controls["promos"] as FormArray;
  };

  addLesson(): void {

    const lessonForm = this.formBuilder.group({
      cantDesde: [''],
      precio: ['']
    });


    this.promos.push(lessonForm);
    this.dataSourcePacks = new MatTableDataSource(this.promos.controls);

    this.cd.detectChanges();

  };


  deleteLesson(lessonIndex: number): void {

    this.promos.removeAt(lessonIndex);
    this.dataSourcePacks = new MatTableDataSource(this.promos.controls);

  };

  onSubmit() {
    console.log(this.promos.value)
  }
}
