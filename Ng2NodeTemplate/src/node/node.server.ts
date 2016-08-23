/// <reference path="../../typings/modules/express/index.d.ts" />
/// <reference path="../../typings/modules/body-parser/index.d.ts" />
/// <reference path="../../typings/modules/chalk/index.d.ts" />
/// <reference path="../../typings/globals/morgan/index.d.ts" />
/// <reference path="../../typings/globals/node/index.d.ts" />

import * as express from 'express';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';
import { RouteConfig } from './node.routes';
import * as chalk from 'chalk';

export class NodeExpressServer {
    private m_port: number = 8080;
    private m_expressApp: express.Application;

    constructor(port?: number) {
        this.m_port = port;

        // create the server instance
        this.m_expressApp = express();
        // initialize the logger
        //this.m_expressApp.use(morgan('    :status    :method    :url'));
        this.m_expressApp.use(morgan(function (tokens: any, req: express.Request, res: express.Response) {            
            if (res.statusCode >= 100 && res.statusCode < 200) {
                return "    " + chalk.bold.white(tokens.method(req, res))
                    + "    " + chalk.grey(tokens.status(req, res))
                    + "    " + chalk.gray(tokens.url(req, res));
            } else if (res.statusCode >= 200 && res.statusCode < 300) {
                return "    " + chalk.bold.white(tokens.method(req, res))
                    + "    " + chalk.bold.green(tokens.status(req, res))
                    + "    " + chalk.gray(tokens.url(req, res));
            } else if (res.statusCode >= 300 && res.statusCode < 400) {
                return "    " + chalk.bold.white(tokens.method(req, res))
                    + "    " + chalk.bold.yellow(tokens.status(req, res))
                    + "    " + chalk.gray(tokens.url(req, res));
            } else {
                return "    " + chalk.bold.white(tokens.method(req, res))
                    + "    " + chalk.bold.underline.red(tokens.status(req, res))
                    + "    " + chalk.white.bgRed(tokens.url(req, res));
            }
        }));

        // add middleware
        this.m_expressApp.use(bodyParser.json());
        this.m_expressApp.use(bodyParser.urlencoded({ extended: true }));

        let path = __dirname + "/../..";
        console.log("\n> wwwroot has been set to: " + path);

        // set wwwroot folder
        this.m_expressApp.use(express.static(path));
    }

    public setRoutes(): void {
        new RouteConfig(this.m_expressApp).setup();
    }

    public startServer(): void {
        this.m_expressApp.listen(this.m_port, this.NodeExpressServer_OnListen.bind(this));        
    }

    private NodeExpressServer_OnListen(): void {
        console.log("> Node express server listening on port: " + this.m_port);
    }
}