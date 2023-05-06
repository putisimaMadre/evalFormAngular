import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild  } from '@angular/core';
import { Subject } from 'rxjs';
import { Alumno } from 'src/app/models/alumno';
import { AlumnoService } from 'src/app/services/alumno.service';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css']
})
export class AlumnosComponent implements AfterViewInit, OnDestroy, OnInit  {
  @ViewChild(DataTableDirective, {static: false})
  dtElement!: DataTableDirective;
  alumnos?: Alumno[]
  dtTrigger: Subject<any> = new Subject<any>()
  dtOptions: DataTables.Settings = {};

  constructor(private alumnoService: AlumnoService, public dialog: MatDialog){}
  ngAfterViewInit(): void {
    this.dtTrigger.next(this.alumnos);
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
  
  ngOnInit(): void { 
    this.dtOptions = {
      //serverSide: false,     // Set the flag
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
          'Tu registro ha sido eliminado.',
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

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next(null);
    });
  }

}
