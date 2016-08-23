import { Injectable } from "@angular/core";
import { Headers, Http, Response } from '@angular/http';
import { Observable } from "rxjs";

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { IRepositoryService } from "../interfaces/IRepositoryService";
import { Thing } from "../models/Thing";

@Injectable()
export class ThingService implements IRepositoryService<Thing> {
    private things: Thing[];
    private baseUrl: string = "api/things";
    private result: any;

    constructor(private http: Http) { }

    public getAll(): Observable<Thing[]> {
        console.log("[SVC] Getting All");

        return this.http.get(this.baseUrl)
            .map((r: Response) => r.json());
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
