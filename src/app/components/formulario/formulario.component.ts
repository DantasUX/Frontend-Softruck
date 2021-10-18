import { Component, OnInit } from "@angular/core";
import { RotasService } from "../../services/rotas.service";
import {
  latLng,
  MapOptions,
  tileLayer,
  Map,
  Polyline,
  Marker,
  Icon,
  LayerGroup,
} from "leaflet";

@Component({
  selector: "app-formulario",
  templateUrl: "./formulario.component.html",
  styleUrls: ["./formulario.component.scss"],
})
export class FormularioComponent implements OnInit {
  map: Map | any;
  mapOptions: MapOptions | any;
  placa!: String;
  title = "frontEndSoftruck";
  localizacoes: Array<any> = new Array();
  listaDePontos: Array<any> = new Array();

  IconPartida = new Icon({
    iconUrl: "assets/img/partida.png",
    iconSize: [36, 58], // size of the icon
    iconAnchor: [15, 54], // point of the icon which will correspond to marker's location
  });

  IconChegada = new Icon({
    iconUrl: "assets/img/chegada.png",
    iconSize: [36, 58], // size of the icon
    iconAnchor: [20, 55], // point of the icon which will correspond to marker's location
  });

  rota = new Polyline([[0, 0]], { color: "#7b1fa2" });
  partida = new Marker([0, 0], { icon: this.IconPartida });
  chegada = new Marker([0, 0], { icon: this.IconChegada });

  marcadores = new LayerGroup([this.partida, this.chegada]);

  constructor(private service: RotasService) {}

  ngOnInit() {
    this.initializeMapOptions();
    this.listarLocalizacoes();
  }

  onMapReady(map: Map) {
    this.map = map;
    this.rota.addTo(this.map);
    this.partida.addTo(this.map);
    this.chegada.addTo(this.map);
  }

  numerodaplaca() {
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
    this.addSampleMarker();
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

  private initializeMapOptions() {
    this.mapOptions = {
      center: latLng(-23.963214, -46.28054, 12),
      zoom: 13,
      layers: [
        tileLayer(
          "https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png",
          {
            maxZoom: 20,
          }
        ),
      ],
    };
  }

  private addSampleMarker() {
    this.rota.setLatLngs(this.listaDePontos);
    this.chegada.setLatLng(this.listaDePontos[this.listaDePontos.length - 1]);
    this.partida.setLatLng(this.listaDePontos[0]);
  }
}
