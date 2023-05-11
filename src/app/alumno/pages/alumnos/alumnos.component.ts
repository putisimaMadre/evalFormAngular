import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Alumno } from 'src/app/models/alumno';
import { AlumnoService } from 'src/app/services/alumno.service';
import { MatDialog } from '@angular/material/dialog';
import { NewAComponent } from '../new-a/new-a.component';
import Swal from 'sweetalert2';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css']
})
export class AlumnosComponent implements OnInit {
  title = 'alumnos';
  displayedColumns: string[] = ['id', 'numeroLista', 'nombres', 'apellidoP', 'apellidoM', 'grado', 'grupo', 'turno', 'action'];
  dataSource: any;
  empdata: any;

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(private alumnoService: AlumnoService, 
    public dialog: MatDialog){}
  
  ngOnInit(): void {
    this.GetAll();
    this.alumnoService.RequiredRefresh.subscribe(r => {
      this.GetAll();
    });
  }

  GetAll() {
    this.alumnoService.getAlumnos().subscribe(result => {
      this.empdata = result;

      this.dataSource = new MatTableDataSource<Alumno>(this.empdata)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  Filterchange(event: Event) {
    const filvalue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filvalue;
  }
  getrow(row: any) {
    //console.log(row);
  }
  FunctionEdit(alumno: Alumno) {
    //console.log(alumno)
    this.OpenDialog('1000ms','600ms',alumno)
  }
  deleteAlumno(id: any) {
      console.log(this.alumnoService.deleteAlumno(id))
      this.alumnoService.deleteAlumno(id).subscribe(alumno => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Alumno Eliminado correctamente',
          showConfirmButton: false,
          timer: 2000
        })
      })
    //alertify.confirm("Remove Employee","Do you want to remove?",()=>{
      // this.alumnoService.Remove(code).subscribe(result => {
      //   this.GetAll();
      //   //alertify.success("Removed successfully.")
      // });
    // },function(){
    // })
  }

  OpenDialog(enteranimation: any, exitanimation: any, code:any) {
    console.log("code")
console.log(code)
    this.dialog.open(NewAComponent, {
      enterAnimationDuration: enteranimation,
      exitAnimationDuration: exitanimation,
      width: "50%",
      data:{
        empcode:code
      }
    })
  }
}
