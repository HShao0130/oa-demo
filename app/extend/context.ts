import jwt from 'jsonwebtoken';

module.exports = {
  get jwt() {
    return jwt;
  },
  get user() {
    const token = this.cookies.get('token');
    console.log('context.user is running');
    const user = jwt.verify(token, this.app.config.jwtSecret);
    return user;
  },
  /**
   * 返回客户端内容
   * @param status // 返回状态
   * @param message // 返回内容
   * @param data // 返回内容
   */
  returnBody(status, msg, data = {}) {
    this.status = status;
    this.body = {
      data,
      message: msg,
      success: true
    };
  },
  /**
   * 驼峰转下划线
   * @param obj // 转换对象
   * @return newObj // 返回转换完成的新对象
   */
  humpToUnderline(obj) {
    const newKey = obj.keys();
    const newObj = {};
    const humpReg = /([A-Z])/g;

    newKey.forEach((item) => {
      newObj[item.replace(humpReg, '_$1').toLowerCase()] = obj[item];
    });
    return newObj;
  }
};
