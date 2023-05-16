import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RasgoService } from 'src/app/services/rasgo.service';
import Swal from 'sweetalert2';
import { Grafico } from 'src/app/models/grafico';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AsignaturaService } from 'src/app/services/asignatura.service';
import { Asignatura } from 'src/app/models/asignatura';

import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { data } from 'jquery';

@Component({
  selector: 'app-rasgo-resumen',
  templateUrl: './rasgo-resumen.component.html',
  styleUrls: ['./rasgo-resumen.component.css']
})
export class RasgoResumenComponent implements OnInit{
  
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

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
      this.resetChart()
      this.rasgoService.getGrafico(this.formRasgo.value).subscribe(valor => {
        
        this.grafico = valor
        let totalPorcentaje: number = 0
        let restante: number = 0
        this.grafico.forEach((res)=>{
          totalPorcentaje = totalPorcentaje + Number.parseInt(res.value)
          console.log(res.value)
          this.addSlice(res.value+"%", Number.parseInt(res.value))
        })
        if(totalPorcentaje != 100){
          restante = 100 - totalPorcentaje
        }
        
        //this.grafico.push({"name": "Faltante", "value": restante.toString()})
        this.addSlice(restante+'% Restante', restante)
      })

      this.rasgoService.getResumen(this.formRasgo.value).subscribe(valor => { 
        this.resumen = valor
      })
    }

    //Graficos
    public pieChartOptions: ChartConfiguration['options'] = {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: 'right',
        },
        datalabels: {
          formatter: (value, ctx) => {
            if (ctx.chart.data.labels) {
              return ctx.chart.data.labels[ctx.dataIndex];
            }
          },
        },
      }
    };


    public pieChartData: ChartData<'pie', number[], string | string[]> = {
      labels: [],
      datasets: [ {
        data: []
      } ]
    };
    public pieChartType: ChartType = 'pie';
    public pieChartPlugins = [ DatalabelsPlugin ];

    addSlice(name: string, valor: number): void {
      if (this.pieChartData.labels) {
        this.pieChartData.labels.push([ name]);
      }
  
      this.pieChartData.datasets[0].data.push(valor);
  
      this.chart?.update();
    }

    resetChart(): void {
      if (this.pieChartData.labels) {
        this.pieChartData.labels.pop();
      }
  
      this.pieChartData.datasets[0].data = [];
      this.pieChartData.labels = [];
  
      this.chart?.update();
    }

}
