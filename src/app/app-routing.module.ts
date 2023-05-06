import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'', loadChildren: ()=> import('./alumno/alumno.module').then(m => m.AlumnoModule)},
  {path:'', loadChildren: ()=> import('./evaluacion-formativa/evaluacion-formativa.module').then(m => m.EvaluacionFormativaModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
