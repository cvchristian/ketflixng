import { Component, OnInit } from '@angular/core';
import { Film } from '../films';
import { FilmService } from '../films.servce';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.css']
})
export class FilmComponent implements OnInit {
  film: Film
  constructor(private filmService: FilmService,
     private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.getFilm()
  }

  /**
   * Call the service to recover the Observable in charge of updating the film
   */
  updateFilm() {
    console.log(this.film)
    var obs = this.filmService.updateFilm(this.film);
    obs.subscribe()
  }
  
  /**
   * Call the service to recover the Observable in charge recovering the data of a film
   */
  getFilm(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.filmService.getFilm(id).subscribe(film => (this.film = film));
  }

  /**
   * Call the service to recover the Observable in charge of deleting a film and 
   * send a message to the websocket so everyone can know it. Then navigates to the 
   * list.
   */
  deleteFilm(): void {
    console.log(this.film)
    var obs = this.filmService.deleteFilm(this.film);
    obs.subscribe( _ =>{
      this.filmService.alertDeletedFilm();
      this.router.navigateByUrl("/films").then(e => {
        if (e) {
          this.filmService.refreshFilms();
          console.log("Navigation is successful!");
        } else {
          console.log("Navigation has failed!");
        }
    });
  }
    );
  }

}
