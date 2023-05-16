import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EvaluacionComponent } from './pages/evaluacion/evaluacion.component';
import { CalificacionComponent } from './pages/calificacion/calificacion.component';

const routes: Routes = [
  {path: 'evaluacion', component: EvaluacionComponent},
  {path: 'calificacion', component: CalificacionComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EvaluacionRoutingModule { }
