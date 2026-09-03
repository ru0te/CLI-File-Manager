import promptSync from 'prompt-sync';
import fs from 'fs';
import os from 'os';
import path from 'path';

const prompt = promptSync({ sigint: true });
const homeDir = os.homedir();

export function createFolder() {
  const folderPath = prompt('Enter path: ');
  const folder = prompt('Enter name of folder: ');
  const filePath = path.join(homeDir, folderPath, folder);

  try {
    fs.mkdirSync(filePath);
    console.log('Folder created sucessfully');
  } catch (err) {
    console.error('Error:', err.message);
  }
}

export function createFile() {
  const folderPath = prompt('Enter folder name or path: ');
  const fileName = prompt('Enter file name: ');
  const filePath = path.join(homeDir, folderPath, fileName);

  try {
    fs.writeFileSync(filePath, 'Hello world!');
    console.log('File created!');
  } catch (err) {
    console.error('Error:', err.message);
  }
}

// ==========================================
// NEW FUNCTIONS (LIST, RENAME, DELETE)
// ==========================================

export function listDirectory() {
  const targetPath = prompt(
    'Enter folder path to list (relative to home, e.g. Desktop or "." for home): ',
  );
  const dirPath =
    targetPath === '.' || targetPath === '' || targetPath === null
      ? homeDir
      : path.join(homeDir, targetPath);

  try {
    const files = fs.readdirSync(dirPath, { withFileTypes: true });

    console.log(`\nContents of ${dirPath}:`);
    if (files.length === 0) {
      console.log('  (empty directory)');
    } else {
      files.forEach((file) => {
        const type = file.isDirectory() ? '[DIR]  ' : '[FILE] ';
        console.log(`  ${type} ${file.name}`);
      });
    }
    console.log('');
  } catch (err) {
    console.error('Error:', err.message);
  }
}

export function renameItem() {
  const parentPath = prompt(
    'Enter folder path (relative to home, e.g. Desktop or "." for home): ',
  );
  const resolvedParent =
    parentPath === '.' || parentPath === '' || parentPath === null
      ? ''
      : parentPath;
  const oldName = prompt('Enter current name of file/folder: ');
  const newName = prompt('Enter new name: ');
  const oldPath = path.join(homeDir, resolvedParent, oldName);
  const newPath = path.join(homeDir, resolvedParent, newName);

  try {
    fs.renameSync(oldPath, newPath);
    console.log('Renamed successfully');
  } catch (err) {
    console.error('Error:', err.message);
  }
}

export function deleteItem() {
  const parentPath = prompt(
    'Enter folder path (relative to home, e.g. Desktop or "." for home): ',
  );
  const resolvedParent =
    parentPath === '.' || parentPath === '' || parentPath === null
      ? ''
      : parentPath;
  const targetName = prompt('Enter name of file or folder to delete: ');
  const targetPath = path.join(homeDir, resolvedParent, targetName);

  try {
    fs.rmSync(targetPath, { recursive: true, force: true });
    console.log('Deleted successfully');
  } catch (err) {
    console.error('Error:', err.message);
  }
}
