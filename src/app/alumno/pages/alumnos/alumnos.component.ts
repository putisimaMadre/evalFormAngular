import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Alumno } from 'src/app/models/alumno';
import { AlumnoService } from 'src/app/services/alumno.service';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css']
})
export class AlumnosComponent implements OnInit {
  
  alumnos?: Alumno[]

  constructor(private alumnoService: AlumnoService, public dialog: MatDialog){}
  dtTrigger: Subject<any> = new Subject<any>()
  dtOptions: DataTables.Settings = {};
  ngOnInit(): void {
     
    this.dtOptions = {
      //serverSide: true,     // Set the flag
    };
    this.alumnoService.getAlumnos().subscribe(alumno => {
      this.alumnos = alumno
      this.dtTrigger.next(alumno)
    })
  }

  modificacion(): void{
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        // confirmButton: 'swalBtnColor',
        // cancelButton: 'btn btn-danger'
      },
      buttonsStyling: true
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Esta seguro?',
      text: "Esta operacion es irreversible!",
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, Borralo!',
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#dc3545',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(result)
        swalWithBootstrapButtons.fire(
          'Eliminado!',
          'Tu registro a sido eliminado.',
          'success'
        )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado'
        )
      }
    })
  }

}
