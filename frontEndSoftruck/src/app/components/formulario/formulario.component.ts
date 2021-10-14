import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { RotasService } from "../../services/rotas.service";

@Component({
  selector: "app-formulario",
  templateUrl: "./formulario.component.html",
  styleUrls: ["./formulario.component.scss"],
})
export class FormularioComponent implements OnInit {
  placa!: String;
  title = "frontEndSoftruck";
  localizacoes: Array<any> = new Array();
  listaDePontos: Array<any> = new Array();
  constructor(private service: RotasService) {}

  @Output() aoEscolherPlaca = new EventEmitter<any>();

  ngOnInit() {
    this.listarLocalizacoes();
  }

  numerodaplaca() {
    this.listaDePontos = [];
    for (var i = 0; i < this.localizacoes.length; i++) {
      if (this.placa == this.localizacoes[i].stop_points.crs.properties.name) {
        for (var e = 0; e < this.localizacoes[i].gps.length; e++) {
          this.listaDePontos[e] = [
            this.localizacoes[i].gps[e].longitude +
              " , " +
              this.localizacoes[i].gps[e].latitude,
          ];
        }
      }
    }
    this.aoEscolherPlaca.emit(this.listaDePontos);
  }

  listarLocalizacoes() {
    this.service.todas().subscribe(
      (localizacoes) => {
        this.localizacoes = localizacoes;
      },
      (err) => {
        console.log("erro ao listar localizaçoes", err);
      }
    );
  }
}
