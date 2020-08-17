import { Controller } from 'egg';

export default class AppController extends Controller {
  public async index() {
    const { ctx } = this;
    await ctx.render('home.js', {
      title: '首页',
      message: { text: 'xxxx' }
    });
  }
  public async login() {
    const { ctx } = this;
    await ctx.render('login.js', {
      title: '登录'
    });
  }
  public async user_center() {
    const { ctx } = this;
    await ctx.render('user_center.js', {
      title: '个人中心'
    });
  }
}