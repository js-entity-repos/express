import * as sourceMapSupport from 'source-map-support';
sourceMapSupport.install();

import axiosFactory from '@js-entity-repos/axios/dist/factory';
import facadeTest from '@js-entity-repos/core/dist/tests';
import { TestEntity } from '@js-entity-repos/core/dist/tests/utils/testEntity';
import axios from 'axios';
import { config } from 'dotenv';
import 'mocha'; // tslint:disable-line:no-import-side-effect
import createTestServer from './utils/createTestServer';
config();

const defaultServerPort = 1337;
const testServerPort = Number(
  process.env.port !== undefined
    ? process.env.port
    : defaultServerPort,
);
const testServerRoute = '/testentities';
const testServer = createTestServer({
  port: testServerPort,
  route: testServerRoute,
});

before(async () => {
  await testServer;
});

after(async () => {
  const server = await testServer;
  server.close();
});

facadeTest(axiosFactory<TestEntity>({
  axios: axios.create({
    baseURL: `http://localhost:${testServerPort}${testServerRoute}`,
  }),
  entityName: 'Test Entity',
}));
