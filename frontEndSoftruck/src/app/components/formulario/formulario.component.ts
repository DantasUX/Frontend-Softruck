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
  icon,
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

  rota = new Polyline([[0, 0]], { color: "#7b1fa2" });
  /**
  chegada = new Marker([0, 0]);**/

  greenIcon = new Icon({
    iconUrl: "leaf-green.png",
    shadowUrl: "leaf-shadow.png",

    iconSize: [38, 95], // size of the icon
    shadowSize: [50, 64], // size of the shadow
    iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62], // the same for the shadow
    popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
  });
  partida = new Marker([-23.963214, -46.28054], { icon: this.greenIcon });

  constructor(private service: RotasService) {}

  ngOnInit() {
    this.initializeMapOptions();
    this.listarLocalizacoes();
  }

  onMapReady(map: Map) {
    this.map = map;
    this.addSampleMarker();
    this.rota.addTo(this.map);
    this.partida.addTo(this.map);
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
          /*
            this.localizacoes[i].gps[e].longitude +
              " , " +
              ,*/
        }
      }
    }
    this.addSampleMarker();
    console.log(this.listaDePontos);
    console.log([
      [122121, 12121],
      [1, 1],
    ]);
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

  private initializeMapOptions(/*ListaDeLocalizacao: number[]*/) {
    this.mapOptions = {
      center: latLng(-23.963214, -46.28054, 12),
      zoom: 13,
      layers: [
        tileLayer(
          "https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png",
          {
            maxZoom: 20,
            attribution:
              '<a href="https://github.com/cyclosm/cyclosm-cartocss-style/releases" title="CyclOSM - Open Bicycle render">CyclOSM</a> | Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          }
        ),
      ],
    };
  }

  private addSampleMarker() {
    this.rota.setLatLngs(this.listaDePontos);
    this.partida.setLatLng(this.listaDePontos[0]);
  }
}
