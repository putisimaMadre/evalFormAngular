import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RasgoService } from 'src/app/services/rasgo.service';
import Swal from 'sweetalert2';
import { Grafico } from 'src/app/models/grafico';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AsignaturaService } from 'src/app/services/asignatura.service';
import { Asignatura } from 'src/app/models/asignatura';
import { Color, ScaleType } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-rasgo-resumen',
  templateUrl: './rasgo-resumen.component.html',
  styleUrls: ['./rasgo-resumen.component.css']
})
export class RasgoResumenComponent implements OnInit{
  asignaturas?: Asignatura[];
  id: any;
  resumen?: any
  tabla = false
  displayedColumns: string[] = ['rasgo', 'porcentaje'];
  grafico: Grafico[] = new Array<Grafico>;

  ngOnInit(): void {
    this.loadAsignaturas()
      if(this.rasgo.empcode!=null && this.rasgo.empcode!=''){
      this.id = this.rasgo.empcode
    }
  }

  constructor(
     private rasgoService: RasgoService,
     private asignaturaService: AsignaturaService,
     private formBuilder: FormBuilder,
     public dialogref: MatDialogRef<RasgoResumenComponent>,
     @Inject(MAT_DIALOG_DATA) public rasgo:any){
      //Object.assign(this, { single })
     }
  
    loadAsignaturas() {
      this.asignaturaService.getAsignaturas().subscribe(result => {
        this.asignaturas = result;
      });
    }
  
    formRasgo: FormGroup = this.formBuilder.group({
      id: ["", Validators.required],
      asignatura: ["", Validators.required],
      grado: ["", Validators.required],
      grupo: ["", Validators.required],
      status: ["1", Validators.required],
    })
    
    consultaRasgo(){
      this.rasgoService.getGrafico(this.formRasgo.value).subscribe(valor => {
        this.grafico = valor

        let totalPorcentaje: number = 0
        let restante: number = 0
        this.grafico.forEach((res)=>{
          totalPorcentaje = totalPorcentaje + Number.parseInt(res.value)
        })
        if(totalPorcentaje != 100){
          restante = 100 - totalPorcentaje
        }
        
        this.grafico.push({"name": "Faltante", "value": restante.toString()})
      })
      this.rasgoService.getResumen(this.formRasgo.value).subscribe(valor => { 
        this.resumen = valor
      })
    }

    //Grafica
  view: [number, number] = [800, 500];

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;

  
    colorScheme: Color = {
      name: 'myScheme',
      selectable: true,
      group: ScaleType.Ordinal,
      domain: ['#716', '#C21', '#C2E'],
    };


  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}
