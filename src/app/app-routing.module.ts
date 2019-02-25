import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FilmsComponent }      from './films/films-component'
import { FilmComponent }      from './film/film-component'
import { NewFilmComponent }      from './newfilm/newfilm-component'


const routes: Routes = [
  { path: 'films', component: FilmsComponent },
  { path: 'film/:id', component: FilmComponent },
  { path: 'newfilm', component: NewFilmComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}