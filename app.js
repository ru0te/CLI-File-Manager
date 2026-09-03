import promptSync from 'prompt-sync';
import fs from 'fs';
import os from 'os';
import path from 'path';

const prompt = promptSync({ sigint: true });
const homeDir = os.homedir() + '/Desktop';

function addToListOfFolders(folder, folderList) {
  folderList.push(folder);
}

function createFolder(folderList) {
  const folder = prompt('Enter name of folder: ');
  fs.mkdir(path.join(homeDir, folder), (err) => {
    if (err) {
      return console.error(err);
    }
    console.log('Folder created sucessfully');
  });
  addToListOfFolders(folder, folderList);
}

function createFile() {
  const filename = prompt('Enter name of file: ');
  fs.writeFile(filename, 'Hello world!', (err) => {
    if (err) throw err;

    console.log('File created!');
  });
}

function main() {
  const allFolders = [];
  const choices = ['create a new folder', 'create a new file'];
  choices.forEach((choice, index) => {
    console.log(`${index + 1}. ${choice}`);
  });
  const userInput = Number(prompt('Choose an option: '));
  switch (userInput) {
    case 1:
      createFolder(allFolders);
      break;
    case 2:
      createFile();
      break;
    default:
      break;
  }

  // console.log(allFolders);
}

main();
