import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Alumno } from 'src/app/models/alumno';
import { AlumnoService } from 'src/app/services/alumno.service';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css']
})
export class AlumnosComponent implements OnInit {
  alumnos?: Alumno[]
  constructor(private alumnoService: AlumnoService){}
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

}
