import fs from "fs";
import { getRootPath } from "../utils/index.js";

export default () => {
  const rootTemplatesPath = getRootPath('../templates')
  if (fs.existsSync(rootTemplatesPath)) {
    // recursive <boolean> 如果为 true，则执行递归删除。 在递归模式下，操作将在失败时重试。 默认值: false。
    fs.rm(rootTemplatesPath, { recursive: true },err => {
      if (err) {
        console.log(err);
      } else {
        console.log('清空本地模板缓存成功！');

        // 重新创建一个空目录
        fs.mkdir(rootTemplatesPath, err1 => {
          if (err1) console.log(err1);
        })
      }
    })
  } else {
    console.log('清空本地模板缓存成功！');
  }
}
