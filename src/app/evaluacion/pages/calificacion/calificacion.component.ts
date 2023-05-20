import { Component, OnInit, ViewChild } from '@angular/core';
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
import { Calificacion } from 'src/app/models/calificacion';
import { NewCalificacionComponent } from 'src/app/evaluacion/pages/new-calificacion/new-calificacion.component'
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-calificacion',
  templateUrl: './calificacion.component.html',
  styleUrls: ['./calificacion.component.css']
})
export class CalificacionComponent implements OnInit{

  displayedColumns: string[] = ['id', 'numeroLista', 'apellidoP', 'apellidoM', 'nombres', 'calificacion', 'nombreActividad', 'comentarios', 'action'];
  dataSourceCalificaciones: any;

  asignaturas?: Asignatura[];
  actividades?: Actividad[];
  rasgos?: Rasgo[];
  alumnos?: Alumno[];
  calificaciones?: Calificacion[];
  grado?: string;
  grupo?: string;

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(
    private rasgoService: RasgoService,
    private actividadService: ActividadService,
    private asignaturaService: AsignaturaService,
    private alumnoService: AlumnoService,
    private calificacionService: CalificacionService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog 
    ) {}

  ngOnInit(): void {
    this.loadAsignaturas()
    this.loadCalificaciones();
    this.calificacionService.RequiredRefresh.subscribe(r => {
      this.loadCalificaciones();
    });
  }

  loadRasgos(id: number) {
    this.rasgoService.getRasgoXAsignatura(id).subscribe(result => {
      this.rasgos = result;
      var first = result.slice(0, 1).shift();
      this.grado = first.grado
      this.grupo = first.grupo
    });
  }

  loadAsignaturas() {
    this.asignaturaService.getAsignaturas().subscribe(result => {
      this.asignaturas = result;
    });
  }

  loadActividades(id: number) {
    this.actividadService.getActividadesXRasgo(id).subscribe(result => {
      this.actividades = result;
      this.alumnos = result
    });
  }

  loadAlumnos() {
    this.alumnoService.getAlumnos().subscribe(result => {
      this.alumnos = result;
    });
  }

  loadCalificaciones(){
    this.calificacionService.consultarDatos(this.formConsultaCalificacion.value).subscribe(result => {
      this.calificaciones = result;
      console.log(result)
      this.dataSourceCalificaciones = new MatTableDataSource<Calificacion>(this.calificaciones)
      this.dataSourceCalificaciones.paginator = this.paginator;
      this.dataSourceCalificaciones.sort = this.sort;
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

  Filterchange(event: Event) {
    const filvalue = (event.target as HTMLInputElement).value;
    this.dataSourceCalificaciones.filter = filvalue;
  }

  getrow(row: any) {
  }

  asignarCalificacion(alumno: any) {
    this.OpenDialog('1000ms','600ms', alumno)
  }

  OpenDialog(enteranimation: any, exitanimation: any, code:any) {
    console.log(code)
    this.dialog.open(NewCalificacionComponent, {
      enterAnimationDuration: enteranimation,
      exitAnimationDuration: exitanimation,
      width: "50%",
      data:{
        empcode:code
      }
    })
  }

  getIdAsignatura(event: any){
    this.loadRasgos(event)
  }

  getIdRasgo(event: any){
    this.loadActividades(event)
    console.log(event)
  }

}
