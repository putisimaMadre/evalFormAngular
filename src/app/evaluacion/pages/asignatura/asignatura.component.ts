import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Asignatura } from 'src/app/models/asignatura';
import { AsignaturaService } from 'src/app/services/asignatura.service';
import { MatDialog } from '@angular/material/dialog';
import { NewAsignaturaComponent } from '../new-asignatura/new-asignatura.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-asignatura',
  templateUrl: './asignatura.component.html',
  styleUrls: ['./asignatura.component.css']
})
export class AsignaturaComponent implements OnInit{

  title = 'asignatura';
  displayedColumns: string[] = ['id', 'asignatura', 'grado', 'grupo', 'action'];
  dataSource: any;
  empdata: any;

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(private asignaturaService: AsignaturaService, 
    public dialog: MatDialog){}

  ngOnInit(): void {
    this.GetAll();
    this.asignaturaService.RequiredRefresh.subscribe(r => {
      this.GetAll();
    });
  }
  GetAll() {
    this.asignaturaService.getAsignaturas().subscribe(result => {
      this.empdata = result;

      this.dataSource = new MatTableDataSource<Asignatura>(this.empdata)
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
  FunctionEdit(asignatura: Asignatura) {
    this.OpenDialog('1000ms','600ms', asignatura)
  }
  deleteAsignatura(id: any) {
      this.asignaturaService.deleteAsignatura(id).subscribe(asignatura => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Asignatura Eliminado correctamente',
          showConfirmButton: false,
          timer: 2000
        })
      })
  }

  OpenDialog(enteranimation: any, exitanimation: any, code:any) {
    this.dialog.open(NewAsignaturaComponent, {
      enterAnimationDuration: enteranimation,
      exitAnimationDuration: exitanimation,
      width: "50%",
      data:{
        empcode:code
      }
    })
  }
}
