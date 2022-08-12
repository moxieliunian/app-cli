// 获取远程仓库目录名称
export const getGitRemoteFilename = (gitUrl) => {
  const arr = gitUrl.split('/')
  return arr[arr.length - 1].split('.')[0]
}