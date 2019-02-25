import { Component, OnInit } from '@angular/core';
import { Film } from '../films';
import { FilmService } from '../films.servce';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-newfilm',
  templateUrl: './newfilm.component.html',
  styleUrls: ['./newfilm.component.css']
})
export class NewFilmComponent implements OnInit {
  film: Film
  waiting: boolean
  constructor(private filmService: FilmService,
     private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.getFilm()
    this.waiting = false;
  }
  
  /**
   * Initialice the new film data
   */
  getFilm(): void {
    this.film = {id:0, description:"", director:"",
        image:"", originalLanguage:"", title:""};
  }

  /**
   * Call the service to recover the Observable in charge of creating a film and 
   * send a message to the websocket so everyone can know it. Then navigates to the 
   * list.
   */
  createFilm(): void {
    console.log(this.film)
    var obs = this.filmService.addFilm(this.film);
    obs.subscribe(value => {
      var idReturned = typeof value === "number" ? value : 0;
      if(idReturned > 0){
        this.filmService.alertCreatedFilm
        this.filmService.refreshFilms();
        this.router.navigateByUrl("/films").then(e => {
          if (e) {
            console.log("Navigation is successful!");
          } else {
            console.log("Navigation has failed!");
          }
        });
      }
    });
  }
}
