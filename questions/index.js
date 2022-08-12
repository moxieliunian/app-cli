import inquirer from 'inquirer'

import remoteUrl from "./remoteUrl.js";
import createDir from "./createDir.js";

export default (templatesDirRootPath) => inquirer.prompt([
  remoteUrl(templatesDirRootPath), // 设置远程仓库地址
  createDir(), // 要创建的目录名称
])
