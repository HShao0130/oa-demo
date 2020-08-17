import { Controller } from 'egg';

export default class PostController extends Controller {
  async success(data) {
    const { ctx } = this;
    ctx.status = 200;
    ctx.body = data;
  }
  async error(msg) {
    const { ctx } = this;
    ctx.status = 500;
    ctx.body = { message: msg };
  }
}
