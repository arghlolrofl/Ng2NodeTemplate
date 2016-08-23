import { Component, OnInit } from "@angular/core";

import { Thing } from "./models/Thing";
import { ThingService } from "./services/ThingService";

@Component({
    providers: [
        ThingService,
    ],
    selector: "my-app",
    templateUrl: "views/app.component.html",
})
export class AppComponent implements OnInit {
    public things: Array<Thing>;

    private thingService: ThingService;

    // service gets injected
    constructor(thingService: ThingService) {
        this.thingService = thingService;
    }

    public ngOnInit(): void {
        let things = new Array<Thing>();

        var x = this.thingService.getAll().subscribe(data => console.log('new list values', data));
    }
}
