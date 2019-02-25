import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FilmsComponent } from "./films/films-component";
import { FilmComponent } from "./film/film-component";
import { NewFilmComponent } from "./newfilm/newfilm-component";
import { AlertsModule } from "angular-alert-module";
import { FormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { Ng2SmartTableModule } from "ng2-smart-table";

@NgModule({
  declarations: [AppComponent, FilmsComponent, FilmComponent, NewFilmComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    Ng2SmartTableModule,
    AlertsModule.forRoot()
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
