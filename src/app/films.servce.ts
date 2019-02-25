import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { Film } from "./films";
import { AlertsService } from "angular-alert-module";
const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};
const FILMS_URL = "http://localhost:9000/film";
const FILMS_WS_ROOT = "ws://127.0.0.1:9000/ws/film";

@Injectable({ providedIn: "root" })
export class FilmService {
  cacheFilms: Film[];
  wsDelete: WebSocket;
  wsCreate: WebSocket;

  constructor(
    private http: HttpClient,
    private alerts: AlertsService
  ) {
    this.wsDelete =  new WebSocket(FILMS_WS_ROOT + "/delete")
    this.wsCreate =  new WebSocket(FILMS_WS_ROOT + "/create")

    // Creator of onMessage function for websockets, we use this to be able to use the alert service
    // inside the onmessage ws function
    var onmesageCreator = function(alertService: AlertsService, message: string,) {
      return function(event: MessageEvent) {
        alertService.setMessage(message, "success")
      };
    };
    this.wsDelete.onerror = function(){

    }
    this.wsCreate.onerror = function(){

    }
    this.wsDelete.onmessage = onmesageCreator(this.alerts, "A film was deleted, refresh your website")
    this.wsCreate.onmessage = onmesageCreator(this.alerts, "A film was created, refresh your website")
  }
 
  /**
   * Method to alert all the users a film has been created
   */
  alertCreatedFilm(): void{
    this.wsCreate.send("")
  }

  /**
   * Method to alert all the users a film has been deleted
   */
  alertDeletedFilm(): void{
    this.wsDelete.send("")
  }

  /** GET films from the server */
  getFilms(): Observable<Film[]> {
    return this.http.get<Film[]>(FILMS_URL).pipe(
      tap(films => {
        this.cacheFilms = films;
        console.log("fetched films");
      })
    );
  }

  //
  /**
   * Method to obtain a film by an id.
   * @param id 
   */
  getFilm(id): Observable<Film> {
    var r = null;
    // Since we may have the film stored, We obtain the film 
    // from the stored films instead of make another request if possible.
    if (this.cacheFilms) {
      r = this.cacheFilms.filter(function(film) {
        return film.id === id;
      })[0];
      return new Observable(observer => {
        observer.next(r);
        observer.complete();
      });
    } else {
      return new Observable(observer => {
        this.getFilms().subscribe(films => {
          this.cacheFilms = films;
          var r = films.filter(function(film) {
            return film.id === id;
          })[0];
          observer.next(r);
          observer.complete();
        });
      });
    }
  }

  /**
   *  refres the list of films
   *  */
  refreshFilms(): void{
    this.getFilms().subscribe()
  }

  /**
   *
   * Method to create the Observable in charge of deleting a film
   * 
   * @param film 
   */
  deleteFilm(film: Film | number): Observable<Film> {
    const id = typeof film === "number" ? film : film.id;
    const url = `${FILMS_URL}/${id}`;

    return this.http.delete<Film>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted film id=${id}`))
    );
  }

/**
   *
   * Method to create the Observable in charge of updating a film
   * 
   * @param film 
   */
  updateFilm(film: Film): Observable<Film> {
    const url = `${FILMS_URL}/${film.id}`;
    return this.http
      .put<Film>(url, film, httpOptions)
      .pipe();
  }

/**
   *
   * Method to create the Observable in charge of adding a film
   * 
   * @param film 
   */
  addFilm(film: Film): Observable<Film> {
    return this.http
      .post<Film>(FILMS_URL, film, httpOptions)
      .pipe();
  }

}
