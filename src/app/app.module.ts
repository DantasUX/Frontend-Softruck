import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { MatSliderModule } from "@angular/material/slider";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";

import { HttpClientModule } from "@angular/common/http";
import { LeafletModule } from "@asymmetrik/ngx-leaflet";
import { FormsModule } from "@angular/forms";
import { FormularioComponent } from "./components/formulario/formulario.component";

@NgModule({
  declarations: [AppComponent, FormularioComponent],
  imports: [
    MatSliderModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,

    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,

    HttpClientModule,
    LeafletModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
