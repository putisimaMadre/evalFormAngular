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
      if(this.asignatura.empcode!=null && this.asignatura.empcode!=''){
      this.LoadEditData(this.asignatura.empcode);
      // console.log(this.asignatura.empcode[0])
    }
  }
  desdata: any;
  editdata: any;

  LoadEditData(idArray: any) {
    console.log(idArray)
    this.calificacionService.getCalificacion(idArray).subscribe(item => {
    this.editdata = item;
    this.formAsignatura.patchValue({
      id: this.editdata.id,
      calificacion: this.editdata[0].calificacion,
      comentario: this.editdata[0].comentario, 
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
