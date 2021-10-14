import { Component } from "@angular/core";
import { RotasService } from "./services/rotas.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  pontos!: String;
  title = "frontEndSoftruck";

  plotarRota($event: any) {
    this.pontos = $event;
    console.log(this.pontos);
  }
}
