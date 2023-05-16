import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActividadService } from 'src/app/services/actividad.service';
import { MatDialog } from '@angular/material/dialog';
import { NewActividadComponent } from '../new-actividad/new-actividad.component';
import Swal from 'sweetalert2';
import { Actividad } from 'src/app/models/actividad';

@Component({
  selector: 'app-actividad',
  templateUrl: './actividad.component.html',
  styleUrls: ['./actividad.component.css']
})
export class ActividadComponent implements OnInit{
  title = 'Actividad';
  displayedColumns: string[] = ['id', 'idAsignatura', 'grado', 'grupo', 'idRasgo', 'actividad', 'action'];
  dataSource: any;
  actividades?: Actividad[];

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(private actividadService: ActividadService, 
    public dialog: MatDialog){}

  ngOnInit(): void {
    this.GetAll();
    this.actividadService.RequiredRefresh.subscribe(r => {
      this.GetAll();
    });
  }

  GetAll() {
    this.actividadService.getActividades().subscribe(result => {
      this.actividades = result;

      this.dataSource = new MatTableDataSource<Actividad>(this.actividades)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  Filterchange(event: Event) {
    const filvalue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filvalue;
  }
  getrow(row: any) {
  }
  FunctionEdit(actividad: Actividad) {
    this.OpenDialog('1000ms','600ms', actividad)
  }
  deleteActividad(id: any) {
      this.actividadService.deleteActividad(id).subscribe(actividad => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Actividad Eliminado correctamente',
          showConfirmButton: false,
          timer: 2000
        })
      })
  }

  OpenDialog(enteranimation: any, exitanimation: any, code:any) {
    this.dialog.open(NewActividadComponent, {
      enterAnimationDuration: enteranimation,
      exitAnimationDuration: exitanimation,
      width: "50%",
      data:{
        empcode:code
      }
    })
  }

}
