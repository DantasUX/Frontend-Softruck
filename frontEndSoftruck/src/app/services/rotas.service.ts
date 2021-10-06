import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class RotasService {
  private listaLocalizacoes: any[];

  constructor() {
    this.listaLocalizacoes = [
      ["dshflkhfs", 1],
      ["dshflkhfs", 2],
      ["dshflkhfs", 3],
    ];
  }

  get Localizacoes() {
    return this.listaLocalizacoes;
  }
}
