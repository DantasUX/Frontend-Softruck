import { Component, Input, OnInit } from "@angular/core";
import {
  latLng,
  MapOptions,
  tileLayer,
  Map,
  Polyline,
  Marker,
  Icon,
} from "leaflet";

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.scss"],
})
export class MapComponent implements OnInit {
  map: Map | any;
  mapOptions: MapOptions | any;

  @Input() listaDePontos: any;

  ngOnChanges() {
    this.addRota();
  }

  IconPartida = new Icon({
    iconUrl: "assets/img/partida.png",
    iconSize: [36, 58],
    iconAnchor: [15, 54],
  });

  IconChegada = new Icon({
    iconUrl: "assets/img/chegada.png",
    iconSize: [36, 58],
    iconAnchor: [20, 55],
  });

  rota = new Polyline([[0, 0]], { color: "#7b1fa2" });
  partida = new Marker([0, 0], { icon: this.IconPartida });
  chegada = new Marker([0, 0], { icon: this.IconChegada });

  ngOnInit() {
    this.initializeMapOptions();
  }

  onMapReady(map: Map) {
    this.map = map;
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

  private addRota() {
    this.rota.setLatLngs(this.listaDePontos).addTo(this.map);
    this.chegada
      .setLatLng(this.listaDePontos[this.listaDePontos.length - 1])
      .addTo(this.map);
    this.partida.setLatLng(this.listaDePontos[0]).addTo(this.map);
  }
}
