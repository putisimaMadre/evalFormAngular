import { Component, DefaultIterableDiffer, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { MatTableDataSource } from '@angular/material/table'
import { Calificacion, UserColumns  } from 'src/app/models/calificacion';
import { CalificacionService } from 'src/app/services/calificacion.service';

@Component({
  selector: 'app-calificacion',
  templateUrl: './calificacion.component.html',
  styleUrls: ['./calificacion.component.css']
})
export class CalificacionComponent implements OnInit{

  displayedColumns: string[] = UserColumns.map((col) => col.key)
  columnsSchema: any = UserColumns
  dataSource = new MatTableDataSource<Calificacion>()
  valid: any = {}

  constructor(public dialog: MatDialog, private calificacionService: CalificacionService) {}

  ngOnInit(): void {
    this.calificacionService.getUsers().subscribe((res: any) => {
      this.dataSource.data = res
    })
  }

  editRow(row: Calificacion) {
    if (row.id === 0) {
      this.calificacionService.addUser(row).subscribe((newUser: Calificacion) => {
        row.id = newUser.id
        row.isEdit = false
      })
    } else {
      this.calificacionService.updateUser(row).subscribe(() => (row.isEdit = false))
    }
  }

  addRow() {
    const newRow: Calificacion = {
      id: 0,
      firstName: '',
      lastName: '',
      email: '',
      birthDate: '',
      isEdit: true,
      isSelected: false,
    }
    this.dataSource.data = [newRow, ...this.dataSource.data]
  }

  removeRow(id: number) {
    this.calificacionService.deleteUser(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter(
        (u: Calificacion) => u.id !== id,
      )
    })
  }

  inputHandler(e: any, id: number, key: string) {
    if (!this.valid[id]) {
      this.valid[id] = {}
    }
    this.valid[id][key] = e.target.validity.valid
  }

  disableSubmit(id: number) {
    if (this.valid[id]) {
      return Object.values(this.valid[id]).some((item) => item === false)
    }
    return false
  }

  isAllSelected() {
    return this.dataSource.data.every((item) => item.isSelected)
  }

  isAnySelected() {
    return this.dataSource.data.some((item) => item.isSelected)
  }

  selectAll(event: any) {
    this.dataSource.data = this.dataSource.data.map((item) => ({
      ...item,
      isSelected: event.checked,
    }))
  }

}
