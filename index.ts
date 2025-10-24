require('dotenv').config();
import 'reflect-metadata';
import { AppDataSource } from './data-source';
import { Server } from '@naiv/codegen-model-typeorm';
import path from 'path';
import Express from 'express'
import { cwd } from 'process';

const server = new Server();
server.express?.use('/', Express.static(path.join(cwd(), './web/dist')));
server.run({
  port: +(process.env.PORT ?? 9415),
  types_path: path.resolve(__dirname, 'types'),
  implementation_path: path.resolve(__dirname, 'implementation'),
  api_prefix: '/api',
  async beforeStart() {
    await AppDataSource.initialize();
  }
});
