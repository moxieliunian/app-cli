#!/usr/bin/env node

import fs from 'fs'
import { execaSync, execa } from 'execa';
import chalk from 'chalk'
import process from 'process'

import commands from '../commands/index.js'
import questions from '../questions/index.js'
import selectModules from '../questions/selectModules.js'
import { copyFile, getGitRemoteFilename } from '../utils/index.js';

if (process.argv[2]) {
  commands(process.argv[2])
} else {
  // 存放模板文件的目录路径
  const templatesDirPath = 'create-modules-storage'
  let getGitRemoteResult = {} // 拉取远程仓库结果
  const processCwd = process.cwd()
  const processCwdArr = processCwd.split('/')
  const templatesDirRootPath = `/${processCwdArr[1]}/${processCwdArr[2]}/${templatesDirPath}`;
  const config = await questions(templatesDirRootPath)

  // 先创建目标目录，以防止用户输入
  fs.mkdirSync(`./${config.createDir}`)
  if (!fs.existsSync(templatesDirRootPath)) {
    fs.mkdirSync(templatesDirRootPath)
  }

  // 远程仓库目录名称
  const gitRemoteFilename = getGitRemoteFilename(config.remoteUrl);
  // 获取远程仓库代码
  const getGitRemote = () => {
    // 该远程仓库是否已经存在于本地
    const exist = fs.existsSync(`${templatesDirRootPath}/${gitRemoteFilename}/.git`)
    // console.log('exist', exist);
    if (exist) { // 存在，则 git pull
      getGitRemoteResult = execaSync(`git`, ['pull'], {
        cwd: `${templatesDirRootPath}/${gitRemoteFilename}`,
        stdio: [2, 2, 2] // 使子进程的输入输出流继承父进程，在当前父进程显示子进程的输入与输出
      })
    }
    else { // 不存在，则 git clone
      try {
        getGitRemoteResult = execaSync(`git`, ['clone', '-b', 'master', config.remoteUrl], {
          cwd: templatesDirRootPath,
          stdio: [2, 2, 2] // 使子进程的输入输出流继承父进程，在当前父进程显示子进程的输入与输出
        })
      } catch (err) {
        fs.rmdirSync(`./${config.createDir}`)
        console.error(err)
      }
    }

    fs.writeFile(`${templatesDirRootPath}/defaultRemoteUrl.txt`, config.remoteUrl, err => {
      if (err) console.log(err);
    })
    // console.log(chalk.blue('getGitRemoteResult：'), getGitRemoteResult);
    if (getGitRemoteResult.failed === true || getGitRemoteResult.failed === undefined || getGitRemoteResult.failed === null) {
      console.error(new Error('读取远程仓库失败！'))
    } else {
      console.log(chalk.green('读取远程仓库成功！'))
    }
  }

  // 读取并选择模板
  const getAndSelectModule = async () => {
    // 获取远程仓库中的目录
    const tplDirs = fs.readdirSync(`${templatesDirRootPath}/${gitRemoteFilename}`)
    // 可选的模板
    const tplModules = []
    for (const item of tplDirs) {
      // 筛选目录并将 .git 排除
      if (item === '.git') continue;
      if (fs.statSync(`${templatesDirRootPath}/${gitRemoteFilename}/${item}`).isDirectory()) {
        tplModules.push({
          value: item,
          name: item,
        })
      }
    }
    // 选择模板
    return await selectModules(tplModules);
  }

  /**
   * 进行copy
   * @param selectedModule    选择的模块
   */
  const fsCopy = (selectedModule) => {
    try {
      copyFile(
        `${templatesDirRootPath}/${gitRemoteFilename}/${selectedModule.tplModule}`,
        `./${config.createDir}`,
        createModuleResult
      )
    } catch (err) {
      fs.rmdir(`./${config.createDir}`)
    }
  }

  const createModuleResult = (err) => {
    if (err) {
      console.error(err);
    } else {
      // git add 新创建的文件
      execa(`git`, ['add', './'], { cwd: './', }, err => {
        if (err) console.log(err);
      })
      console.log(chalk.green('创建模块成功！'))
    }
  };

  try {
    getGitRemote();
    const selectedModule = await getAndSelectModule();
    fsCopy(selectedModule)
  } catch (err) {
    fs.rmdir(`./${config.createDir}`)
  }
}

