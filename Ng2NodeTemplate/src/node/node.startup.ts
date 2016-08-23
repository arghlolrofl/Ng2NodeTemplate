var System = require('systemjs');
import { NodeExpressServer } from './node.server';

const nodeServer = new NodeExpressServer(8080);
nodeServer.setRoutes();
nodeServer.startServer();
