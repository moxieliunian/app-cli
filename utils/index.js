import path from 'path';
import { fileURLToPath } from 'url';
import { copyFile } from './copy-file.js';
import { getGitRemoteFilename } from './get-remote-file-name.js';

export const getRootPath = (pathUrl) => {
  const __dirname = fileURLToPath(import.meta.url)
  return path.resolve(__dirname, `../${pathUrl}`)
}

export {
  copyFile,
  getGitRemoteFilename
};