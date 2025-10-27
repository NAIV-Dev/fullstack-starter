require('dotenv').config();
import 'reflect-metadata';
import { AppDataSource } from './data-source';
import { Server } from '@naiv/codegen-model-typeorm';
import path from 'path';
import Express from 'express'
import { cwd } from 'process';
import { PersistentDB } from './persistent-db';

const server = new Server();
server.express?.use('/', Express.static(path.join(cwd(), './web/dist')));
server.express?.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(cwd(), './web/dist/index.html'));
})
server.run({
  port: +(process.env.PORT ?? 9415),
  types_path: path.resolve(__dirname, 'types'),
  implementation_path: path.resolve(__dirname, 'implementation'),
  api_prefix: '/api',
  async beforeStart() {
    await AppDataSource.initialize();
    await PersistentDB.createIfNotExist();
  }
});
