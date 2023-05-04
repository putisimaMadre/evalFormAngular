import { Component, OnInit } from '@angular/core';
import { TableService } from '../services/table.service';
import { Table } from '../models/table'
import { Subject } from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import { DialogContentExampleDialogComponent } from '../dialog-content-example-dialog/dialog-content-example-dialog.component'

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit{
  constructor(private tableService: TableService, public dialog: MatDialog){}
  dtOptions: DataTables.Settings = {};
  datos?: Table[]
  dtTrigger: Subject<any> = new Subject<any>()
  seleccionado = false

  ngOnInit(): void {
    this.dtOptions = {
      //serverSide: true,     // Set the flag
    };

    this.tableService.clientes().subscribe(dato => {
      this.datos = dato
      this.dtTrigger.next(dato)
    })
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogContentExampleDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}