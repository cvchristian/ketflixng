import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Film } from "../films";
import { FilmService } from "../films.servce";

@Component({
  selector: "app-films",
  templateUrl: "./films.component.html",
  styleUrls: ["./films.component.css"]
})
export class FilmsComponent implements OnInit {
  films: Film[];
  settings = {
    actions: {
      add: false,
      delete: false,
      edit: false
    },
    columns: {
      id: {
        title: "ID"
      },
      title: {
        title: "Title"
      },
      director: {
        title: "Director"
      },
      description: {
        title: "Description"
      },
      originalLanguage: {
        title: "Lang."
      }
    }
  };
  constructor(private filmService: FilmService, private router: Router) {}

  ngOnInit() {
    this.getFilms();
  }

/**
 * Method to load the films throught the service
 */
  getFilms(): void {
    this.filmService.getFilms().subscribe(films => (this.films = films));
  }

/**
 * Method to add a film throught the service
 */
  addFilm(film: Film): void {
    if (!film.title) {
      return;
    }
    this.filmService.addFilm(film).subscribe(film => {
      this.films.push(film);
    });
  }

  /**
   * Method to launch every time an user click on a row of the list of film to navigate to that
   * film detail
   * 
   * @param event 
   */
  onUserRowSelect(event): void {
    var url = "/film/" + event.data.id;
    this.router.navigateByUrl(url).then(e => {
      if (e) {
        console.log("Navigation is successful!");
      } else {
        console.log("Navigation has failed!");
      }
    });
  }
}
