import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Alumno } from 'src/app/models/alumno';
import { AlumnoService } from 'src/app/services/alumno.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { MasterService } from 'src/app/services/master.service';
//import * as alertify from 'alertifyjs';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-new-a',
  templateUrl: './new-a.component.html',
  styleUrls: ['./new-a.component.css']
})
export class NewAComponent implements OnInit{
  disableSelect = new FormControl(false);
  // formAlumno: FormGroup = this.formBuilder.group({
  //   "numeroLista": [],
  //   "nombres": [],
  //   "apellidoP": [],
  //   "apellidoM": [],
  //   "grado": [],
  //   "grupo": [],
  //   "turno": [],
  //   "status": [1]
  // })
  constructor(private router:Router,
     private alumnoService: AlumnoService,
     private formBuilder: FormBuilder,
     public dialogref: MatDialogRef<NewAComponent>,
     @Inject(MAT_DIALOG_DATA) public data:any){}
  ngOnInit(): void {
      this.loadDes();
      if(this.data.empcode!=null && this.data.empcode!=''){
      this.LoadEditData(this.data.empcode);
    }
  }

  desdata: any;
  respdata: any;
  editdata: any;

  loadDes() {
    this.alumnoService.getAlumnos().subscribe(result => {
      this.desdata = result;
    });
  }

  formAlumno: FormGroup = this.formBuilder.group({
    numeroLista: ["", Validators.required],
    nombres: ["", Validators.required],
    apellidoP: ["", Validators.required],
    apellidoM: ["", Validators.required],
    grado: ["", Validators.required],
    grupo: ["", Validators.required],
    turno: ["", Validators.required],
    status: ["1", Validators.required],
  })

  // Reactiveform = new FormGroup({
  //   numeroLista: new FormControl("", Validators.required),
  //   nombres: new FormControl("", Validators.required),
  //   apellidoP: new FormControl("", Validators.required),
  //   apellidoM: new FormControl("", Validators.required),
  //   grado: new FormControl("", Validators.required),
  //   grupo: new FormControl("", Validators.required),
  //   turno: new FormControl("", Validators.required),
  // });

  LoadEditData(numeroLista: any) {
      this.alumnoService.getAlumno(numeroLista).subscribe(item => {
      this.editdata = item;
      this.formAlumno.setValue({
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

  // SaveEmployee() {
  //   console.log(this.formAlumno.value)
  //   this.alumnoService.saveAlumno(this.formAlumno.value).subscribe(alumno => {
  //     this.router.navigate(['/alumnos'])
  //   })
    // if (this.Reactiveform.valid) {
    //   this.service.Save(this.Reactiveform.value.nombres).subscribe(result => {
    //     this.respdata = result;
    //     if (this.respdata.result == 'pass') {
    //       //alertify.success("saved successfully.")
    //       this.dialogref.close();
    //     }
    //   });

    // } else {
    //   //alertify.error("Please Enter valid data")
    // }
  // }

  saveCliente(){
    this.alumnoService.saveAlumno(this.formAlumno.value).subscribe(alumno=>{
      // this.respdata = alumno;
      // this.router.navigate(['/alumnos'])
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Alumno guardado correctamente',
            showConfirmButton: false,
            timer: 3000
          })
          this.dialogref.close();
      // window.location.reload();
    })
  }
}
