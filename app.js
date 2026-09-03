#!/usr/bin/env node

import promptSync from 'prompt-sync';
import {
  createFile,
  createFolder,
  listDirectory,
  renameItem,
  deleteItem,
} from './file-manager.js';

const prompt = promptSync({ sigint: true });

import chalk from 'chalk';

function showBanner() {
  console.log(
    chalk.bold.magenta('\n========================================='),
  );
  console.log(chalk.bold.cyan('       CLI FILE MANAGER REPL v1.0        '));
  console.log(chalk.bold.magenta('========================================='));
  console.log(chalk.gray('Available commands:'));
  console.log(chalk.green('  - create-folder (or cfo)'));
  console.log(chalk.green('  - create-file (or cf)'));
  console.log(chalk.green('  - list-dir (or ls)'));
  console.log(chalk.green('  - rename (or rn)'));
  console.log(chalk.green('  - delete (or rm)'));
  console.log(chalk.green('  - exit / quit\n'));
}

// Helper to wrap command execution and style success messages in green
function executeWithSuccessFeedback(
  actionFn,
  successMatchText,
  customSuccessMessage,
) {
  const originalLog = console.log;
  console.log = (...logArgs) => {
    if (
      typeof logArgs[0] === 'string' &&
      logArgs[0].includes(successMatchText)
    ) {
      originalLog(chalk.bold.green(customSuccessMessage));
    } else {
      originalLog(...logArgs);
    }
  };

  try {
    actionFn();
  } finally {
    // Restore original console.log after async file operations complete
    setTimeout(() => {
      console.log = originalLog;
    }, 1500);
  }
}

const commandMap = {
  'create-folder': (...args) => {
    executeWithSuccessFeedback(
      () => createFolder(...args),
      'Folder created sucessfully',
      '✔ Success: Folder created successfully!',
    );
  },
  cfo: (...args) => {
    executeWithSuccessFeedback(
      () => createFolder(...args),
      'Folder created sucessfully',
      '✔ Success: Folder created successfully!',
    );
  },
  'create-file': (...args) => {
    executeWithSuccessFeedback(
      () => createFile(...args),
      'File created!',
      '✔ Success: File created successfully!',
    );
  },
  cf: (...args) => {
    executeWithSuccessFeedback(
      () => createFile(...args),
      'File created!',
      '✔ Success: File created successfully!',
    );
  },
  'list-dir': (...args) => listDirectory(...args),
  ls: (...args) => listDirectory(...args),
  rename: (...args) => {
    executeWithSuccessFeedback(
      () => renameItem(...args),
      'Renamed successfully',
      '✔ Success: Renamed successfully!',
    );
  },
  rn: (...args) => {
    executeWithSuccessFeedback(
      () => renameItem(...args),
      'Renamed successfully',
      '✔ Success: Renamed successfully!',
    );
  },
  delete: (...args) => {
    executeWithSuccessFeedback(
      () => deleteItem(...args),
      'Deleted successfully',
      '✔ Success: Deleted successfully!',
    );
  },
  rm: (...args) => {
    executeWithSuccessFeedback(
      () => deleteItem(...args),
      'Deleted successfully',
      '✔ Success: Deleted successfully!',
    );
  },
  exit: () => {
    console.log(chalk.bold.green('\nExiting CLI FILE MANAGER.'));
    process.exit(0);
  },
  quit: () => {
    console.log(chalk.bold.green('\nExiting CLI FILE MANAGER.'));
    process.exit(0);
  },
};

function main() {
  showBanner();

  while (true) {
    try {
      const userInput = prompt(chalk.bold.cyan('> '));

      if (userInput === null) {
        console.log(chalk.bold.green('\nExiting CLI FILE MANAGER.'));
        break;
      }

      const trimmedInput = userInput.trim();
      if (!trimmedInput) {
        continue;
      }

      const parts = trimmedInput.split(/\s+/);
      const commandName = parts[0].toLowerCase();
      const args = parts.slice(1);

      const matchedCommand = commandMap[commandName];

      if (matchedCommand) {
        matchedCommand(...args);
      } else {
        console.log(
          chalk.red(
            `Unknown command: "${commandName}". Type "create-folder", "create-file", "list-dir", "rename", "delete", or "exit".`,
          ),
        );
      }
    } catch (err) {
      console.error(chalk.red('Error:'), err.message);
    }
  }
}

main();
