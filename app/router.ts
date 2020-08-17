
import { Application } from 'egg';
export default (app: Application) => {
  const { router, controller } = app;
  router.get('/', controller.client.index);
  router.get('/login', controller.client.login);
  router.get('/user_center', controller.client.user_center);

  // api
  router.post('/api/login', controller.login.loginIn);
};
