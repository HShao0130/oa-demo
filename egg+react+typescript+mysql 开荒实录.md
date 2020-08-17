# egg+react+typescript+mysql 开荒实录

## 客户端
### 服务端渲染组件事件绑定失效以及生命周期不执行的问题(render与hydrate)
版本：react16.x以上
问题描述：在正常的声明组件类之后，使用 ReactDOM.render() 进行渲染，会出现组件上绑定的事件不会触发的问题，并且声明周期也不会执行。
```js
export default class App extends React.Component<Props> {
  componentDidMount() {
    // do something
  }
  handleChange() {
    // do something
  }
  render() {
    return <div>
      <input onChange={this.handleChange} />
    </div>;
  }
}
```
官方文档上有提及以 ReactDOM.render() 来渲染服务端的方式将在 react17.0 之后废弃，取而代之的是 hydrate() 这个 api。
出现的原因可以查看这几篇文章 [Document that you can't rely on React 16 SSR patching up differences](https://github.com/facebook/react/issues/10591)，[render !== hydrate](https://zhuanlan.zhihu.com/p/33887159)，[react中出现的"hydrate"](https://www.zhihu.com/question/66068748)

## 服务端
服务端使用 mysql 数据库

### egg-mysql 插件使用
选择使用 mysql 数据库，根据 egg 官方文档推荐使用 egg-mysql 插件来访问 mysql 数据库。
#### 使用方法：
```js
// config/plugin.ts
export default {
  mysql: {
    enable: true,
    package: 'egg-mysql'
  }
}
```
```js
// config/config.${env}.js
exports.mysql = {
  // 单数据库信息配置
  client: {
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: 'test_password', // 连接数据库的密码
    database: 'test', // 数据库名
  },
  app: true, // 是否加载到 app 上，默认开启
  agent: false, // 是否加载到 agent 上，默认关闭
};
```
之后便可在 Service 层中通过 app.mysql 来调用 egg-mysql 插件的方法
#### 实例挂载不到 application 上
由于项目中使用了ts，在ts中第三方库的使用需要有声明文件，而 egg-mysql 作者还没有添加声明文件，所以我们需要手动来为它加一个声明，在 app 文件夹下创建一个 typings 文件夹，存放会用到的第三方库的声明文件，在 typings 下创建一个 index.d.ts（所有声明文件都要以 *.d.ts 结尾），并在其中加入：
```js
import 'egg';
declare module 'egg' {
  interface Application {
    mysql: any;
    sequelize: any;
  }
}
```


## TODO
后面考虑将客户端和服务端的代码拆分，最后形成这样一个结构：
```
client // 客户端
db // 数据库
server // 服务端
```

