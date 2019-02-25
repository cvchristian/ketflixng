import { Component, OnInit } from "@angular/core";
import { Observable, from } from "rxjs";
import { map, filter, switchMap } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { Film } from './films';


@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "Ketflix";

  films$: Observable<Film[]>;
  films: Film[];

  constructor(private http: HttpClient) {}

  ngOnInit() {

  }
}
