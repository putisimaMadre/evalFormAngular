import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Alumno } from 'src/app/models/alumno';
import { AlumnoService } from 'src/app/services/alumno.service';

@Component({
  selector: 'app-alumnos-input',
  templateUrl: './alumnos-input.component.html',
  styleUrls: ['./alumnos-input.component.css']
})
export class AlumnosInputComponent implements OnInit{
// @Input() nuevosAlumnos?: Alumno[]
@Output() alumnosShow: EventEmitter<Alumno[]> = new EventEmitter()

alumnos?: Alumno[]
constructor(private alumnoService: AlumnoService){}
  ngOnInit(): void {
    this.alumnoService.getAlumnos().subscribe(alumno => {
      this.alumnos = alumno
      this.alumnosShow.emit(this.alumnos)
    })
  }


// nuevosAlumnosF(): void{
//   console.log(this.nuevosAlumnos)
// }
}
