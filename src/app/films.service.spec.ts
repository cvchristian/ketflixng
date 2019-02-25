import { FilmService } from "./films.servce";
import { Film } from "./films";
import { AlertsService } from "angular-alert-module";

import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";

describe("FilmService", () => {
  let service: FilmService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FilmService, AlertsService]
    });
  });

  beforeEach(() => {
    service = TestBed.get(FilmService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it("#getFilm should return film", () => {
    service.getFilm(0).subscribe(value => {
      expect(value.id).toBe(0);
    });
    const req = httpMock.expectOne(`http://localhost:9000/film`);
    expect(req.request.method).toBe("GET");
    req.flush([
      {
        id: 0
      }
    ]);
    httpMock.verify();
  });

  it("#getFilm should return a film from cache", () => {
    service.cacheFilms = [
      {
        id: 0,
        description: "",
        director: "",
        image: "",
        originalLanguage: "",
        title: ""
      },
      {
        id: 1,
        description: "",
        director: "",
        image: "",
        originalLanguage: "",
        title: ""
      }
    ];

    service.getFilm(0).subscribe(value => {
      expect(value.id).toBe(0);
    });
  });

  it("#getFilms should return a list of films", () => {
    service.getFilms().subscribe(value => {
      expect(value.length).toBeGreaterThan(1);
    });

    const req = httpMock.expectOne(`http://localhost:9000/film`);
    expect(req.request.method).toBe("GET");
    req.flush([
      {
        id: 0
      },
      {
        id: 1
      }
    ]);
    httpMock.verify();
  });

  it("#addFilm should add a new Film", () => {
    var film: Film;

    service.addFilm(film).subscribe(value => {
      expect(value.id).toBe(0);
    });
    const req = httpMock.expectOne(`http://localhost:9000/film`);
    expect(req.request.method).toBe("POST");
    req.flush({
      id: 0
    });
    httpMock.verify();
  });

  it("#create an incorrect film should fail", () => {
    var film: any = {
      id: 0,
      descriptian: "",
      director: "",
      image: "",
      originalLanguage: "",
      title: ""
    };
    film.id = 0;
    let response: any;
    let errResponse: any;
    service
      .addFilm(film)
      .subscribe(res => (response = res), err => (errResponse = err));
    const req = httpMock.expectOne(`http://localhost:9000/film`);
    expect(req.request.method).toBe("POST");
    const mockErrorResponse = { status: 400, statusText: "Bad Request" };
    req.flush({}, mockErrorResponse);
    //const data = 'Invalid request parameters';
    expect(errResponse).toBeTruthy();
    httpMock.verify();
  });

  it("#updateFilm should update a film", () => {
    var film: Film = {
      id: 0,
      description: "",
      director: "",
      image: "",
      originalLanguage: "",
      title: ""
    };
    film.id = 0;
    let response: any;
    let errResponse: any;
    service
      .updateFilm(film)
      .subscribe(res => (response = res), err => (errResponse = err));
    const req = httpMock.expectOne(`http://localhost:9000/film/0`);
    expect(req.request.method).toBe("PUT");
    const mockErrorResponse = { status: 200, statusText: "ok" };
    req.flush({}, mockErrorResponse);
    //const data = 'Invalid request parameters';
    expect(response).toBeTruthy();
    httpMock.verify();
  });

  it("#updateFilm should fail when update a film that does not exists", () => {
    var film: Film = {
      id: 0,
      description: "",
      director: "",
      image: "",
      originalLanguage: "",
      title: ""
    };
    film.id = 0;
    let response: any;
    let errResponse: any;
    service
      .updateFilm(film)
      .subscribe(res => (response = res), err => (errResponse = err));
    const req = httpMock.expectOne(`http://localhost:9000/film/0`);
    expect(req.request.method).toBe("PUT");
    const mockErrorResponse = { status: 404, statusText: "Not found" };
    req.flush({}, mockErrorResponse);
    expect(errResponse).toBeTruthy();
    httpMock.verify();
  });

  it("#deleteFilm should delete a film", () => {
    var film: Film = {
      id: 0,
      description: "",
      director: "",
      image: "",
      originalLanguage: "",
      title: ""
    };
    film.id = 0;
    let response: any;
    let errResponse: any;
    service
      .deleteFilm(film)
      .subscribe(res => (response = res), err => (errResponse = err));
    const req = httpMock.expectOne(`http://localhost:9000/film/0`);
    expect(req.request.method).toBe("DELETE");
    const mockErrorResponse = { status: 200, statusText: "ok" };
    req.flush({}, mockErrorResponse);
    //const data = 'Invalid request parameters';
    expect(response).toBeTruthy();
    httpMock.verify();
  });

  it("#deleteFilm should fail when delete a film that does not exists", () => {
    var film: Film = {
      id: 0,
      description: "",
      director: "",
      image: "",
      originalLanguage: "",
      title: ""
    };
    film.id = 0;
    let response: any;
    let errResponse: any;
    service
      .deleteFilm(film)
      .subscribe(res => (response = res), err => (errResponse = err));
    const req = httpMock.expectOne(`http://localhost:9000/film/0`);
    expect(req.request.method).toBe("DELETE");
    const mockErrorResponse = { status: 404, statusText: "Not found" };
    req.flush({}, mockErrorResponse);
    expect(errResponse).toBeTruthy();
    httpMock.verify();
  });
});
