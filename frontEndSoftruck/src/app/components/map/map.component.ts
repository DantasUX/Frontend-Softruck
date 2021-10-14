import { Component, Input, OnInit } from "@angular/core";
import {
  latLng,
  MapOptions,
  tileLayer,
  Map,
  Marker,
  icon,
  Polyline,
} from "leaflet";

import { RotasService } from "../../services/rotas.service";

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.scss"],
})
export class MapComponent implements OnInit {
  map: Map | any;
  mapOptions: MapOptions | any;

  @Input() pontos: any;

  constructor(private service: RotasService) {}

  ngOnInit() {
    this.initializeMapOptions();
    this.addSampleMarker();
  }

  onMapReady(map: Map) {
    this.map = map;
    this.addSampleMarker();
  }

  private initializeMapOptions(/*ListaDeLocalizacao: number[]*/) {
    this.mapOptions = {
      center: latLng(-7.266211, -35.876735, 30),
      zoom: 2,
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

  private desenharRota() {
    console.log("plotado rota");
  }

  private addSampleMarker() {
    const marker = new Polyline(
      [
        [-23.963214, -46.28054],
        [-23.96325, -46.280544],
        [-23.96319, -46.280536],
        [-23.963218, -46.280566],
        [-23.969987, -46.26833],
      ],
      { color: "#7b1fa2" }
    );
    /*const marker = new Marker([51.51, 0]).setIcon(
      icon({
        iconSize: [41, 41],
        iconAnchor: [13, 41],
        iconUrl:
          "https://img2.gratispng.com/20180424/zxq/kisspng-computer-icons-hyperlink-polaris-learning-ltd-links-5adee2eb997730.4694308715245565236286.jpg",
      })
    );*/
    marker.addTo(this.map);
  }
}
