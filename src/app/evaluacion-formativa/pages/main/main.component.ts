import { Component } from '@angular/core';
import { FormArray, FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {showError: true},
    },
  ],
})
export class MainComponent {
  constructor(private formBuilder: FormBuilder){}
  firstFormGroup = this.formBuilder.group({
    nombre: ['', Validators.required],
    grado: ['', Validators.required],
    grupo: ['', Validators.required],
  });
  secondFormGroup: FormGroup = this.formBuilder.group({
    // rasgos: this.formBuilder.array([this.formBuilder.group({Rasgo: ['']})])
    rasgos: this.formBuilder.array([])
  });
  thirdFormGroup: FormGroup = this.formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  //Declara un arreglo
  rasgosFormArray: FormGroup = this.formBuilder.group({  
    rasgos: this.formBuilder.array([])
  })
  // form = this.fb.group({
  //   ... other form controls ...
  //   lessons: this.fb.array([])
  // });
  //declara el grupo utilizado en el form
  rasgoGrupoForm: FormGroup = this.formBuilder.group({
    nombre: new FormControl('', [Validators.required])
  });

  get getRasgo() {
    return this.rasgosFormArray.controls["rasgos"] as FormArray;
  }

  // get lessons() {
  //   return this.form.controls["lessons"] as FormArray;
  // }

  newRasgo(){
    this.getRasgo.push(this.rasgoGrupoForm);
  }

  // addLesson() {
  //   const lessonForm = this.fb.group({
  //       title: ['', Validators.required],
  //       level: ['beginner', Validators.required]
  //   });
  
  //   this.lessons.push(lessonForm);
  // }

  guardarRasgos(){
    console.log(this.rasgosFormArray.value)
  }

}