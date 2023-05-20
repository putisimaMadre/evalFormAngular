import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConstruccionComponent } from './construccion/construccion.component';

const routes: Routes = [
  {path:'', loadChildren: ()=> import('./alumno/alumno.module').then(m => m.AlumnoModule)},
  {path:'', loadChildren: ()=> import('./evaluacion/evaluacion.module').then(m => m.EvaluacionModule)},
  {path: 'construccion', component: ConstruccionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
