import { EggAppConfig, PowerPartial } from 'egg';
import * as ip from 'ip';
import * as path from 'path';

export default (app: EggAppConfig) => {
  const config = {} as PowerPartial<EggAppConfig>;

  config.view = {
    cache: false
  };

  config.static = {
    maxAge: 0 // maxAge 缓存，默认 1 年
  };

  config.development = {
    watchDirs: ['build'], // 指定监视的目录（包括子目录），当目录下的文件变化的时候自动重载应用，路径从项目根目录开始写
    ignoreDirs: ['app/web', 'public', 'config'] // 指定过滤的目录（包括子目录）
  };

  config.logview = {
    dir: path.join(app.baseDir, 'logs')
  };

  config.reactssr = {
    injectCss: true
  };

  const localIP = ip.address();
  const domainWhiteList = [];
  [7001, 9000, 9001].forEach((port) => {
    domainWhiteList.push(`http://localhost:${port}`);
    domainWhiteList.push(`http://127.0.0.1:${port}`);
    domainWhiteList.push(`http://${localIP}:${port}`);
  });

  config.security = {
    csrf: {
      ignore: ctx => {
        const ipReg = /^(172\.17|127\.0)/;
        return ipReg.test(ctx.ip);
      }
    }
  };

  config.security = {
    domainWhiteList,
    // 解决 egg csrf 安全问题，模拟本地请求不会跨域 https://eggjs.org/zh-cn/faq.html#%E4%B8%BA%E4%BB%80%E4%B9%88%E4%BC%9A%E6%9C%89-csrf-%E6%8A%A5%E9%94%99
    csrf: {
      enable: false
    }
  };

  return config;
};
