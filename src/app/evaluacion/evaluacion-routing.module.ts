import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EvaluacionComponent } from './pages/evaluacion/evaluacion.component';

const routes: Routes = [
  {path: 'evaluacion', component: EvaluacionComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EvaluacionRoutingModule { }
