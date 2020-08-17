import { EggPlugin } from 'egg';
// import 'tsconfig-paths/register';

const plugin: EggPlugin = {};

plugin.reactssr = {
  package: 'egg-view-react-ssr'
};

plugin.mysql = {
  enable: true,
  package: 'egg-mysql'
};

plugin.sequelize = {
  enable: true,
  package: 'egg-sequelize'
};

plugin.cors = {
  enable: true,
  package: 'egg-cors'
};

export default plugin;