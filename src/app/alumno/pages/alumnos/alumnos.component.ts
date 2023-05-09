import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Employee } from 'src/app/models/Employee';
import { Subject } from 'rxjs';
import { Alumno } from 'src/app/models/alumno';
import { AlumnoService } from 'src/app/services/alumno.service';
import { MatDialog } from '@angular/material/dialog';
import { MasterService } from 'src/app/services/master.service';
import * as alertify from 'alertifyjs'

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css']
})
export class AlumnosComponent implements OnInit {
  title = 'alumnos';
  displayedColumns: string[] = ['numeroLista', 'nombres', 'apellidoP', 'apellidoM', 'grado', 'grupo', 'turno'];
  dataSource: any;
  empdata: any;

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  
  alumnos?: Alumno[]

  constructor(private alumnoService: AlumnoService, private service: MasterService, public dialog: MatDialog){}
  dtTrigger: Subject<any> = new Subject<any>()
  dtOptions: DataTables.Settings = {};
  
  ngOnInit(): void {
    this.GetAll();
    this.service.RequiredRefresh.subscribe(r => {
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
    console.log(row);
  }
  // FunctionEdit(code: any) {
  //   this.OpenDialog('1000ms','600ms',code)
  // }
  FunctionDelete(code: any) {
    alertify.confirm("Remove Employee","Do you want to remove?",()=>{
      this.service.Remove(code).subscribe(result => {
        this.GetAll();
        alertify.success("Removed successfully.")
      });

    },function(){

    })
    
  }

  // OpenDialog(enteranimation: any, exitanimation: any,code:any) {

  //   this.dialog.open(ModalpopupComponent, {
  //     enterAnimationDuration: enteranimation,
  //     exitAnimationDuration: exitanimation,
  //     width: "50%",
  //     data:{
  //       empcode:code
  //     }
  //   })
  // }
}
