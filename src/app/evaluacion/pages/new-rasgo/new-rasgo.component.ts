import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RasgoService } from 'src/app/services/rasgo.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Rasgo } from 'src/app/models/rasgo';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AsignaturaService } from 'src/app/services/asignatura.service';
import { Asignatura } from 'src/app/models/asignatura';

@Component({
  selector: 'app-new-rasgo',
  templateUrl: './new-rasgo.component.html',
  styleUrls: ['./new-rasgo.component.css']
})
export class NewRasgoComponent implements OnInit{

  porcentaje?: any
  rasgos?: Rasgo[];
  asignaturas?: Asignatura[];
  editdata: any;
  id: any;

  constructor(
    private router:Router,
     private rasgoService: RasgoService,
     private asignaturaService: AsignaturaService,
     private formBuilder: FormBuilder,
     public dialogref: MatDialogRef<NewRasgoComponent>,
     @Inject(MAT_DIALOG_DATA) public rasgo:any){}

  ngOnInit(): void {
    this.loadRasgos();
    this.loadAsignaturas()
      if(this.rasgo.empcode!=null && this.rasgo.empcode!=''){
      this.LoadEditData(this.rasgo.empcode);
      this.id = this.rasgo.empcode
    }
  }

  loadRasgos() {
    this.rasgoService.getRasgos().subscribe(result => {
      this.rasgos = result;
    });
  }

  loadAsignaturas() {
    this.asignaturaService.getAsignaturas().subscribe(result => {
      this.asignaturas = result;
      console.log(this.asignaturas)
    });
  }

  formRasgo: FormGroup = this.formBuilder.group({
    id: ["", Validators.required],
    rasgo: ["", Validators.required],
    porcentaje: ["", Validators.required],
    idAsignatura: ["", Validators.required],
    status: ["1", Validators.required],
  })

  LoadEditData(id: any) {
      this.rasgoService.getRasgo(id).subscribe(item => {
      this.editdata = item;
      this.formRasgo.setValue({
        id: this.editdata.id,
        rasgo: this.editdata.rasgo,
        porcentaje: this.editdata.porcentaje,
        idAsignatura: this.editdata.idAsignatura,
        status: this.editdata.status
      })
    });
  }

  saveRasgo(){
    this.rasgoService.saveRasgo(this.formRasgo.value).subscribe(()=>{
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Rasgo guardado correctamente',
            showConfirmButton: false,
            timer: 2000
          })
          this.dialogref.close();
    })
  }

  updateRasgo(): void{
    this.rasgoService.updateRasgo(this.formRasgo.value).subscribe(() => {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Rasgo actualizado correctamente',
        showConfirmButton: false,
        timer: 2000
      })
      this.dialogref.close();
      this.router.navigate(['/evaluacion'])
    })
  }
}
