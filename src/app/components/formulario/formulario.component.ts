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

  @Output() aoEscolherPlaca = new EventEmitter<any>();

  constructor(private service: RotasService) {}

  ngOnInit() {
    this.listarLocalizacoes();
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

  escolherPlaca() {
    this.listaDePontos = [];
    for (var i = 0; i < this.localizacoes.length; i++) {
      if (this.placa == this.localizacoes[i].stop_points.crs.properties.name) {
        for (var e = 0; e < this.localizacoes[i].gps.length; e++) {
          this.listaDePontos.push([
            this.localizacoes[i].gps[e].latitude,
            this.localizacoes[i].gps[e].longitude,
          ]);
        }
      }
    }
    this.aoEscolherPlaca.emit(this.listaDePontos);
  }
}
