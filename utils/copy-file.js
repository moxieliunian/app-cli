import fsExtra from 'fs-extra';

export const copyFile = async (temp, target, callback) => {
  await fsExtra.copy(temp, target, callback);
}