import { BrowserModule } from "@angular/platform-browser";
import { HttpModule } from "@angular/http";
import { NgModule } from "@angular/core";

import { AppComponent }  from "./app.component";
import { ThingService } from "./services/ThingService";

@NgModule({
    bootstrap: [AppComponent],
    declarations: [AppComponent],
    imports: [BrowserModule, HttpModule],
    providers: [ThingService],
})
export class AppModule { }
