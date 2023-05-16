import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RasgoService } from 'src/app/services/rasgo.service';
import { Rasgo } from 'src/app/models/rasgo';
import { Actividad } from 'src/app/models/actividad';
import { Alumno } from 'src/app/models/alumno';
import { AsignaturaService } from 'src/app/services/asignatura.service';
import { ActividadService } from 'src/app/services/actividad.service';
import { AlumnoService } from 'src/app/services/alumno.service';
import { CalificacionService } from 'src/app/services/calificacion.service';
import { Asignatura } from 'src/app/models/asignatura';

@Component({
  selector: 'app-calificacion',
  templateUrl: './calificacion.component.html',
  styleUrls: ['./calificacion.component.css']
})
export class CalificacionComponent implements OnInit{

  asignaturas?: Asignatura[];
  actividades?: Actividad[];
  rasgos?: Rasgo[];
  alumnos?: Alumno[];

  constructor(
    private rasgoService: RasgoService,
    private actividadService: ActividadService,
    private asignaturaService: AsignaturaService,
    private alumnoService: AlumnoService,
    private calificacionService: CalificacionService,
    private formBuilder: FormBuilder, 
    ) {}

  ngOnInit(): void {
    this.loadRasgos();
    this.loadAsignaturas()
    this.loadAlumnos()
    this.loadActividades()
  }

  loadRasgos() {
    this.rasgoService.getRasgos().subscribe(result => {
      this.rasgos = result;
    });
  }

  loadAsignaturas() {
    this.asignaturaService.getAsignaturas().subscribe(result => {
      this.asignaturas = result;
    });
  }

  loadActividades() {
    this.actividadService.getActividades().subscribe(result => {
      this.actividades = result;
    });
  }

  loadAlumnos() {
    this.alumnoService.getAlumnos().subscribe(result => {
      this.alumnos = result;
    });
  }

  formConsultaCalificacion: FormGroup = this.formBuilder.group({
    id: ["", Validators.required],
    idAsignatura: ["", Validators.required],
    idRasgo: ["", Validators.required],
    idActividad: ["", Validators.required],
    grado: ["", Validators.required],
    grupo: ["", Validators.required],
    status: [1, Validators.required],
  })

  consultarDatos(){
    console.log(this.formConsultaCalificacion.value)    
  }

}
