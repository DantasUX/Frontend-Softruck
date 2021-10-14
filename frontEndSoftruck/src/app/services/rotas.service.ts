import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Course } from "../models/localizacoes.model";

@Injectable({
  providedIn: "root",
})
export class RotasService {
  private url = "http://localhost:3000/courses";
  constructor(private httpClient: HttpClient) {}

  todas(): Observable<any> {
    return this.httpClient.get(this.url);
  }
}
