export default () => ({
  type: 'input',
  name: 'createDir',
  message: '请输入要创建的目录名称',
  validate(val) {
    if (val) return true;
    return '请输入要创建的目录名称'
  }
})
