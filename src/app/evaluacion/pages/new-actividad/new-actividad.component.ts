import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActividadService } from 'src/app/services/actividad.service';
import { RasgoService } from 'src/app/services/rasgo.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AsignaturaService } from 'src/app/services/asignatura.service';
import { Asignatura } from 'src/app/models/asignatura';
import { Actividad } from 'src/app/models/actividad';
import { Rasgo } from 'src/app/models/rasgo';
import { AlumnoService } from 'src/app/services/alumno.service';

@Component({
  selector: 'app-new-actividad',
  templateUrl: './new-actividad.component.html',
  styleUrls: ['./new-actividad.component.css']
})
export class NewActividadComponent implements OnInit{

  actividades?: Actividad[];
  asignaturas?: Asignatura[];
  rasgos?: Rasgo[];
  editdata: any;
  id: any;

  constructor(
    private router:Router,
     private rasgoService: RasgoService,
     private asignaturaService: AsignaturaService,
     private formBuilder: FormBuilder,
     private actividadService: ActividadService,
     private alumnoService: AlumnoService,
     public dialogref: MatDialogRef<NewActividadComponent>,
     @Inject(MAT_DIALOG_DATA) public actividad:any){}

     ngOnInit(): void {
      this.loadRasgos();
      this.loadAsignaturas()
        if(this.actividad.empcode!=null && this.actividad.empcode!=''){
        this.LoadEditData(this.actividad.empcode);
        this.id = this.actividad.empcode
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
      });
    }

    public formActividad: FormGroup = this.formBuilder.group({
      id: ["", Validators.required],
      idRasgo: ["", Validators.required],
      idAsignatura: ["", Validators.required],
      actividad: ["", Validators.required],
      status: ["1", Validators.required],
    })
  
    LoadEditData(id: any) {
        this.actividadService.getActividad(id).subscribe(item => {
        this.editdata = item;
        this.formActividad.setValue({
          id: this.editdata.id,
          idRasgo: this.editdata.idRasgo,
          idAsignatura: this.editdata.idAsignatura,
          actividad: this.editdata.actividad,
          status: this.editdata.status
        })
      });
    }
  
    saveActividad(){
      this.actividadService.saveActividad(this.formActividad.value).subscribe((idActividad)=>{
        //===getGradoGrupoTurno===
        //Esta funcion lo que hace es que guarda en la tabla alumnoActividad el id del alumno y con el id de la actividad
        console.log(this.formActividad.value)
        console.log("=======")
        console.log(idActividad)
        this.actividadService.getGradoGrupoTurno(idActividad).subscribe(res => {
          console.log(res)
        })
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Actividad guardado correctamente',
          showConfirmButton: false,
          timer: 2000
        })
        this.dialogref.close();
      })
    }
  
    updateActividad(): void{
      this.actividadService.updateActividad(this.formActividad.value).subscribe(() => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Actividad actualizado correctamente',
          showConfirmButton: false,
          timer: 2000
        })
        this.dialogref.close();
        this.router.navigate(['/evaluacion'])
      })
    }

}
