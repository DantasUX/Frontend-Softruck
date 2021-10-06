import { Component } from "@angular/core";
import { RotasService } from "./services/rotas.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "frontEndSoftruck";
  constructor(private service: RotasService) {}

  ngOnInit() {
    console.log(this.service.Localizacoes);
    console.log(this.service.Localizacoes[4]);
  }
}
