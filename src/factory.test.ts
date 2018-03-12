import * as sourceMapSupport from 'source-map-support';
sourceMapSupport.install();

import axiosFactory from '@js-entity-repos/axios/dist/factory';
import facadeTest from '@js-entity-repos/core/dist/tests';
import { TestEntity } from '@js-entity-repos/core/dist/tests/utils/testEntity';
import * as assert from 'assert';
import axios from 'axios';
import { config } from 'dotenv';
import { BAD_REQUEST, OK } from 'http-status-codes';
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

const axiosClient = axios.create({
  baseURL: `http://localhost:${testServerPort}${testServerRoute}`,
});

facadeTest(axiosFactory<TestEntity>({
  axios: axiosClient,
  entityName: 'Test Entity',
}));

describe('facade', () => {
  it('should not throw errors when not using any query params', async () => {
    const response = await axiosClient.get('/');
    assert.equal(response.status, OK);
  });
  it('should throw JSON error when using invalid filter', async () => {
    await axiosClient.get('/?filter=invalid_json').then((response) => {
      return { response };
    }).catch((err) => {
      assert.equal(err.response.status, BAD_REQUEST);
    });
  });
  it('should throw number error when using invalid limit', async () => {
    await axiosClient.get('/?limit=invalid_number').then((response) => {
      return { response };
    }).catch((err) => {
      assert.equal(err.response.status, BAD_REQUEST);
    });
  });
});
