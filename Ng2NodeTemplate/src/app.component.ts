import { Component, OnInit } from "@angular/core";

import { Thing } from "./models/Thing";
import { ThingRepositoryService } from "./services/ThingRepositoryService";

@Component({
    providers: [
        ThingRepositoryService,
    ],
    selector: "my-app",
    templateUrl: "views/app.component.html",
})
export class AppComponent implements OnInit {
    public things: Array<Thing>;

    private thingRepository: ThingRepositoryService;

    // service gets injected
    constructor(thingService: ThingRepositoryService) {
        this.thingRepository = thingService;
    }

    public ngOnInit(): void {
        this.thingRepository
            .getAll()
            .subscribe((data: Thing[]) => this.things = data);
    }
}
