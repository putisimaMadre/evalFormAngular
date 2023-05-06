import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RasgoRoutingModule } from './rasgo-routing.module';
import { NewRComponent } from './pages/new-r/new-r.component';
import { RasgosComponent } from './pages/rasgos/rasgos.component';
import { NombreRasgoComponent } from './pages/nombre-rasgo/nombre-rasgo.component';


@NgModule({
  declarations: [
    NewRComponent,
    RasgosComponent,
    NombreRasgoComponent
  ],
  imports: [
    CommonModule,
    RasgoRoutingModule
  ]
})
export class RasgoModule { }
