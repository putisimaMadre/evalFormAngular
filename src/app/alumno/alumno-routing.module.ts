import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlumnosComponent } from './pages/alumnos/alumnos.component';
import { NewAComponent } from './pages/new-a/new-a.component';

const routes: Routes = [
  {path:'alumnos', component:AlumnosComponent},
  {path:'newA', component:NewAComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlumnoRoutingModule { }
