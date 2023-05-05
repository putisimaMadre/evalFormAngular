import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Alumno } from 'src/app/models/alumno';
import { AlumnoService } from 'src/app/services/alumno.service';

@Component({
  selector: 'app-new-a',
  templateUrl: './new-a.component.html',
  styleUrls: ['./new-a.component.css']
})
export class NewAComponent {

  formAlumno: FormGroup = this.formBuilder.group({
    "numeroLista": [],
    "nombres": [],
    "apellidoP": [],
    "apellidoM": [],
    "grado": [],
    "grupo": [],
    "turno": [],
    "status": [1]
  })
  constructor(private formBuilder: FormBuilder, private alumnoService: AlumnoService){}

  saveCliente(): void{
    this.alumnoService.saveAlumno(this.formAlumno.value).subscribe()
  }

}
