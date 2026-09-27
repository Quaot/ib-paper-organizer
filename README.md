# IB Paper Organizer

Turns a folder of IB past papers into a library you can search, with every mark scheme matched to its paper.

![The library view](docs/screenshot.png)

## The problem

Past papers download with names like `MA-24M-P1-1-HL.pdf` and `MS-PH-25M-P2-3-HL.pdf`. After a year of revision you have several hundred of them in one folder. Finding the May 2024 Maths HL Paper 1 for timezone 1, and then its mark scheme, means reading filenames one at a time.

## What it does

Point it at the folder once and it reads every PDF underneath, including subfolders.

- **Reads the naming convention.** Each filename is parsed into subject, year, session, timezone, level and paper number, so you filter by what you actually want rather than by text matching.
- **Pairs papers with mark schemes.** A question paper and its `MS-` counterpart appear on the same row.
- **Searches everything at once.** One box covers year, session, timezone, level, subject, filename and your own notes.
- **Opens papers in your reader**, or saves a copy elsewhere, without leaving the app.
- **Remembers your folder** between launches.

## Install

Download the installer from [Releases](../../releases) and run it. Windows only for now.

## Run from source

```bash
npm install
npm start
```

To build the installer yourself:

```bash
npm run dist:win
```

## How it works

`main.js` is the Electron main process. It walks the chosen folder, hands the PDF list to the renderer, and owns everything that touches the disk: the folder picker, opening a file in the system reader, saving a copy, and storing the last folder in app settings. `preload.js` exposes only those operations to the page, so the renderer never gets direct filesystem access.

`renderer/app.js` holds the parsing rules and the interface. Filename parsing is the core of it, and those rules started life in the two files under `prototype/`, which is where the naming convention was first worked out in a single HTML page.

## Version history

- **v2.1.2** (September 2026) Electron desktop app, recursive folder scan, remembered folder, paper and mark scheme pairing, save a copy.
- **v1** (2024) Single HTML page, manual file picker, no persistence. Kept in `prototype/`.

## Built with

Electron 41, electron-builder, plain JavaScript with no framework.

## Licence

MIT
