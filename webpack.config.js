'use strict';
// https://www.yuque.com/easy-team/egg-react/config
const path = require('path');
const resolve = (filepath) => path.resolve(__dirname, filepath);
module.exports = {
  devtool: 'eval',
  entry: {
    home: 'app/web/page/home/index.tsx',
    user_center: 'app/web/page/user_center/index.tsx',
    login: 'app/web/page/login/index.tsx',
  },
  lib: ['react', 'react-dom'],
  loaders: {
    babel: {
      include: [resolve('app/web'), resolve('node_modules')]
    },
    less: {
      include: [resolve('app/web'), resolve('node_modules')],
      options: {
        javascriptEnabled: true,
        modifyVars: {
          'primary-color': '#B0C4D4',
          'link-color': '#1DA57A',
          'border-radius-base': '2px'
        }
      }
    },
    typescript: true
  },
  plugins: {
    imagemini: false
  },
  done() {
    console.log('---webpack compile finish---');
  }
};