import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home-component/home-component';
import { SerieComponent } from './components/serie-component/serie-component';
import { PersonajeComponent } from './components/personaje-component/personaje-component';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "serie/:idSerie", component: SerieComponent},
  {path: "personaje/:idSerie", component: PersonajeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
