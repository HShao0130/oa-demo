import * as path from 'path';
import * as fs from 'fs';
import { EggAppConfig, PowerPartial } from 'egg';

export default function(appInfo: EggAppConfig) {
  const config = {} as PowerPartial<EggAppConfig>;

  config.keys = '123456';

  config.siteFile = {
    '/favicon.ico': fs.readFileSync(path.join(appInfo.baseDir, 'app/web/asset/images/favicon.ico'))
  };

  config.logger = {
    consoleLevel: 'DEBUG',
    dir: path.join(appInfo.baseDir, 'logs')
  };

  config.static = {
    prefix: '/public/',
    dir: path.join(appInfo.baseDir, 'public')
  };

  config.middleware = [];

  config.reactssr = {
    layout: path.join(appInfo.baseDir, 'app/web/view/layout.html')
  };

  config.cors = {
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
  };

  config.jwtSecret = 'wilioa';

  config.auth_cookie_name = 'token';

  // config.mysql = {
  //   client: {
  //     host: '127.0.0.1',
  //     port: '3306',
  //     user: 'root',
  //     password: 'wili1234',
  //     database: 'wilioa'
  //   },
  //   app: true,
  //   agent: false
  // };
  config.middleware = ['errorHandler'];

  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    database: 'learn',
    username: 'root',
    password: 'wili1234',
    operatorsAliases: false
  };

  return config;
}
