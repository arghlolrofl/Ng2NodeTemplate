/// <reference path="../../typings/modules/express/index.d.ts" />

import * as express from 'express';
import { Thing } from './../models/Thing';

export class RouteConfig {
    constructor(
        private app: express.Application
    ) { }

    public setup() {
        this.app.get('/api', function (req: express.Request, res: express.Response) {
            res.send("API Documentation");
        });

        this.app.get("/api/things", function (req: express.Request, res: express.Response) {
            let list = new Array<Thing>();
            list.push(new Thing("Thing 1"));
            list.push(new Thing("Thing 2"));

            res.send(JSON.stringify(list));            
        });

        this.app.get("/api/things/:id", function (req: any, res: any) {
            var id = req.params.id;

            res.send({ "id": id, "name": "A thing" });
        });
    }
}