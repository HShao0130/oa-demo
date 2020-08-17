import request from './request.ts';

export const api = {
  login(data) {
    return request.post('/api/login', data)
  }
}
