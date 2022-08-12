import { config } from '../constant/config.js';

export default () => {
  return {
    name: 'remoteUrl',
    default: config.remoteGitUrl,
    message: '请设置远程仓库地址',
    validate(val) {
      // git仓库的正则表达式 http://cn.voidcc.com/question/p-qlprjeax-kd.html
      const gitRemoteUrlReg = /(\w+:\/\/)([email protected])*([\w\d\.]+)(:[\d]+){0,1}\/*(.*)/
      if (!val) {
        return '请设置远程仓库地址'
      } else if (!gitRemoteUrlReg.test(val)) {
        return '远程仓库地址格式错误，请重新输入'
      } else {
        return true;
      }
    }
  }
}

