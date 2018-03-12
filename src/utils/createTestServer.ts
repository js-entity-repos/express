import memoryFactory from '@js-entity-repos/memory/dist/factory';
import * as express from 'express';
import { createServer, Server } from 'http';
import expressFactory from '../factory';

export interface Config {
  readonly port: number;
  readonly route: string;
}

export default ({ port, route }: Config): Promise<Server> => {
  return new Promise<Server>((resolve) => {
    const app = express();
    const state = { entities: [] };
    app.use(route, expressFactory({
      service: memoryFactory({
        defaultPaginationLimit: 100,
        entityName: 'Test Entity',
        getEntities: () => state.entities,
        setEntities: (entities) => state.entities = entities,
      }),
    }));
    const server = createServer(app);
    server.listen(port, () => {
      // tslint:disable-next-line:no-console
      console.log(`Started test server on port ${port}`);
      resolve(server);
    });
  });
};
