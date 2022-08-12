# create-modules-tools

> **该命令通过读取远程仓库，将仓库中每一个目录视为一份代码模板，您选择模板后会自动将该模板写入您设置的目录中**



## 使用方式

### 安装

```shell
npm i -g create-modules-tools
```



### 使用

需要 `Node.js >= 12.0.0`

```shell
create-module
```

图示：

![图示](https://img-blog.csdnimg.cn/184ee95c416c4135a0dc543eda81b856.gif)



## 说明

- 设置远程仓库地址，默认为上一次设置的仓库地址。只会读取仓库 `master` 分支中的 **一级**  **目录**（一级**文件**不会被读取）。你可以随意编辑你的模板内容，只要你需要。





## Commands

| command | 别名 | 说明             |
| ------- | ---- | ---------------- |
| --help  | -h   | 帮助             |
| clear   |      | 清空本地模板缓存 |

