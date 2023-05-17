import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AsignaturaService } from 'src/app/services/asignatura.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CalificacionService } from 'src/app/services/calificacion.service';

@Component({
  selector: 'app-new-calificacion',
  templateUrl: './new-calificacion.component.html',
  styleUrls: ['./new-calificacion.component.css']
})
export class NewCalificacionComponent implements OnInit {

  constructor(
    private router:Router,
    private calificacionService: CalificacionService,
     private formBuilder: FormBuilder,
     public dialogref: MatDialogRef<NewCalificacionComponent>,
     @Inject(MAT_DIALOG_DATA) public asignatura:any
  ){}

  ngOnInit(): void {
      if(this.asignatura.empcode[0]!=null && this.asignatura.empcode[0]!=''){
      //this.LoadEditData(this.asignatura.empcode[0]);
      // console.log(this.asignatura.empcode[0])
    }
  }
  desdata: any;
  editdata: any;

  LoadEditData(id: any) {
    this.calificacionService.getCalificacion(id).subscribe(item => {
    this.editdata = item;
    console.log(this.editdata)
    this.formAsignatura.setValue({
      calificacion: this.editdata.calificacion,
      comentario: this.editdata.comentario, 
      status: this.editdata.status
    })
  });
}

  formAsignatura: FormGroup = this.formBuilder.group({
    id: ["", Validators.required],
    calificacion: ["", Validators.required],
    comentario: ["", Validators.required],
    status: ["1", Validators.required],
  })

  saveCalificacion(){
    let grupo = [this.formAsignatura.value, this.asignatura.empcode]
    this.calificacionService.saveCalificacion(grupo).subscribe(res => {
      this.dialogref.close();
    })
  }

}
