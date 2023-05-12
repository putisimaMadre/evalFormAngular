import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Rasgo } from 'src/app/models/rasgo';
import { RasgoService } from 'src/app/services/rasgo.service';
import { MatDialog } from '@angular/material/dialog';
import { NewRasgoComponent } from '../new-rasgo/new-rasgo.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rasgo',
  templateUrl: './rasgo.component.html',
  styleUrls: ['./rasgo.component.css']
})
export class RasgoComponent implements OnInit{

  title = 'rasgo';
  displayedColumns: string[] = ['id', 'idAsignatura', 'grado', 'grupo', 'rasgo', 'porcentaje', 'action'];
  dataSource: any;
  rasgos?: Rasgo[];

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(private rasgoService: RasgoService, 
    public dialog: MatDialog){}

  ngOnInit(): void {
    this.GetAll();
    this.rasgoService.RequiredRefresh.subscribe(r => {
      this.GetAll();
    });
  }

  GetAll() {
    this.rasgoService.getRasgos().subscribe(result => {
      this.rasgos = result;

      this.dataSource = new MatTableDataSource<Rasgo>(this.rasgos)
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
  FunctionEdit(rasgo: Rasgo) {
    this.OpenDialog('1000ms','600ms', rasgo)
  }
  deleteRasgo(id: any) {
      this.rasgoService.deleteRasgo(id).subscribe(rasgo => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Rasgo Eliminado correctamente',
          showConfirmButton: false,
          timer: 2000
        })
      })
  }

  OpenDialog(enteranimation: any, exitanimation: any, code:any) {
    console.log(code)
    this.dialog.open(NewRasgoComponent, {
      enterAnimationDuration: enteranimation,
      exitAnimationDuration: exitanimation,
      width: "50%",
      data:{
        empcode:code
      }
    })
  }

}
