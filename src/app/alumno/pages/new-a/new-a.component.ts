import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlumnoService } from 'src/app/services/alumno.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-new-a',
  templateUrl: './new-a.component.html',
  styleUrls: ['./new-a.component.css']
})
export class NewAComponent implements OnInit{

  desdata: any;
  editdata: any;
  id: any
  
  constructor(private router:Router,
     private alumnoService: AlumnoService,
     private formBuilder: FormBuilder,
     public dialogref: MatDialogRef<NewAComponent>,
     @Inject(MAT_DIALOG_DATA) public alumno:any){}

  ngOnInit(): void {
      this.loadDes();
      console.log(this.alumno)
      if(this.alumno.empcode!=null && this.alumno.empcode!=''){
      this.LoadEditData(this.alumno.empcode);
      console.log(this.alumno.empcode)
      this.id = this.alumno.empcode
    }
  }

  loadDes() {
    this.alumnoService.getAlumnos().subscribe(result => {
      this.desdata = result;
    });
  }

  formAlumno: FormGroup = this.formBuilder.group({
    id: ["", Validators.required],
    numeroLista: ["", Validators.required],
    nombres: ["", Validators.required],
    apellidoP: ["", Validators.required],
    apellidoM: ["", Validators.required],
    grado: ["", Validators.required],
    grupo: ["", Validators.required],
    turno: ["", Validators.required],
    status: ["1", Validators.required],
  })

  LoadEditData(id: any) {
      this.alumnoService.getAlumno(id).subscribe(item => {
      this.editdata = item;
      this.formAlumno.setValue({
        id: this.editdata.id,
        numeroLista: this.editdata.numeroLista,
        nombres: this.editdata.nombres,
        apellidoP: this.editdata.apellidoP,
        apellidoM: this.editdata.apellidoM,
        grado: this.editdata.grado,
        grupo: this.editdata.grupo,
        turno: this.editdata.turno,
        status: this.editdata.status
      })
    });
  }

  saveAlumno(){
    this.alumnoService.saveAlumno(this.formAlumno.value).subscribe(alumno=>{
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Alumno guardado correctamente',
            showConfirmButton: false,
            timer: 2000
          })
          this.dialogref.close();
    })
  }

  updateAlumno(): void{
    this.alumnoService.updateAlumno(this.formAlumno.value).subscribe(alumno => {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Alumno actualizado correctamente',
        showConfirmButton: false,
        timer: 2000
      })
      this.dialogref.close();
      this.router.navigate(['/alumnos'])
    })
  }
}
