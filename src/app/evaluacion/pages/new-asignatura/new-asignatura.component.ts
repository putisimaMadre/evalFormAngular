import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AsignaturaService } from 'src/app/services/asignatura.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-new-asignatura',
  templateUrl: './new-asignatura.component.html',
  styleUrls: ['./new-asignatura.component.css']
})
export class NewAsignaturaComponent implements OnInit{
  
  constructor(
    private router:Router,
     private asignaturaService: AsignaturaService,
     private formBuilder: FormBuilder,
     public dialogref: MatDialogRef<NewAsignaturaComponent>,
     @Inject(MAT_DIALOG_DATA) public asignatura:any
  ){}
  
  ngOnInit(): void {
    this.loadDes();
      console.log(this.desdata)
      if(this.asignatura.empcode!=null && this.asignatura.empcode!=''){
      this.LoadEditData(this.asignatura.empcode);
      console.log(this.asignatura.empcode)
      this.id = this.asignatura.empcode
    }
  }
  desdata: any;
  editdata: any;
  id: any;

  loadDes() {
    this.asignaturaService.getAsignaturas().subscribe(result => {
      this.desdata = result;
    });
  }

  formAsignatura: FormGroup = this.formBuilder.group({
    id: ["", Validators.required],
    asignatura: ["", Validators.required],
    grado: ["", Validators.required],
    grupo: ["", Validators.required],
    status: ["1", Validators.required],
  })

  LoadEditData(id: any) {
      this.asignaturaService.getAsignatura(id).subscribe(item => {
      this.editdata = item;
      this.formAsignatura.setValue({
        id: this.editdata.id,
        asignatura: this.editdata.asignatura,
        grado: this.editdata.grado,
        grupo: this.editdata.grupo,
        status: this.editdata.status
      })
    });
  }

  saveAsignatura(){
    this.asignaturaService.saveAsignatura(this.formAsignatura.value).subscribe(()=>{
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Asignatura guardada correctamente',
            showConfirmButton: false,
            timer: 2000
          })
          this.dialogref.close();
    })
  }

  updateAsignatura(): void{
    this.asignaturaService.updateAsignatura(this.formAsignatura.value).subscribe(() => {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Asignatura actualizado correctamente',
        showConfirmButton: false,
        timer: 2000
      })
      this.dialogref.close();
      this.router.navigate(['/evaluacion'])
    })
  }

}
