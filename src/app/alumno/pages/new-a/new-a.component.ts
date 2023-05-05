import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Alumno } from 'src/app/models/alumno';
import { AlumnoService } from 'src/app/services/alumno.service';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-a',
  templateUrl: './new-a.component.html',
  styleUrls: ['./new-a.component.css']
})
export class NewAComponent {
  disableSelect = new FormControl(false);
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
  constructor(private router:Router, private formBuilder: FormBuilder, private alumnoService: AlumnoService){}

  saveCliente(): void{
    console.log(this.formAlumno.value)
    this.alumnoService.saveAlumno(this.formAlumno.value).subscribe(()=>{
      this.router.navigate(['/alumnos'])
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Alumno guardado correctamente',
        showConfirmButton: false,
        timer: 3000
      })
    })
  }

}
