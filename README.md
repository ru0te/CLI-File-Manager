# CLI File Manager

An interactive, REPL-based command-line file manager built with Node.js, `prompt-sync`, and styled with `chalk`.

## Features

- **Interactive REPL Loop**: Run commands in an ongoing session.
- **Terminal Styling**: Color-coded banners, prompts (`>`), success messages, and error alerts.
- **File & Folder Operations**
- **Local Global CLI Setup**: Can be linked locally via `npm link` so you can run it as a command from anywhere on your computer.

---

## Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended) installed on your machine.

---

## Installation & Local Setup

Since this package is not published to npm, follow these steps to run it locally:

1. **Clone or open the project folder** in your terminal:

   ```bash
   cd CLI-File-Manager
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Link for local global usage** (optional, allows running `filemgr` from any directory):
   ```bash
   npm link
   ```

---

## How to Run

### Option A: Run locally via global command (if you ran `npm link`)

Simply type:

```bash
filemgr
```

### Option B: Run directly with Node

```bash
node app.js
```

---

## Available Commands

Once the CLI prompt (`>`) appears, you can use the following commands:

| Command         | Alias | Description                                                                            |
| :-------------- | :---- | :------------------------------------------------------------------------------------- |
| `create-folder` | `cfo` | Creates a new folder at a specified path.                                              |
| `create-file`   | `cf`  | Creates a new file with default "Hello world!" content.                                |
| `list-dir`      | `ls`  | Lists files and directories in a given path (e.g., `Desktop`, `.`, or absolute paths). |
| `rename`        | `rn`  | Renames an existing file or folder.                                                    |
| `delete`        | `rm`  | Deletes a file or folder (supports recursive folder deletion).                         |
| `exit` / `quit` | —     | Exits the CLI session.                                                                 |

---

## Example Usage Session

```text
=========================================
       CLI FILE MANAGER REPL v1.0
=========================================
Available commands:
  - create-folder (or cfo)
  - create-file (or cf)
  - list-dir (or ls)
  - rename (or rn)
  - delete (or rm)
  - exit / quit

> list-dir
Enter folder path to list (e.g. Desktop, /absolute/path, or "." for home): Desktop

Contents of /Users/username/Desktop:
  [DIR]   my-new-folder
  [FILE]  notes.txt

> create-folder
Enter path: Desktop
Enter name of folder: projects
✔ Success: Folder created successfully!

> exit
Exiting CLI FILE MANAGER.
```
