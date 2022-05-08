import { Injectable } from '@angular/core';
import * as childProcess from 'child_process';

// If you import a module but never use any of the imported values other than as TypeScript types,
// the resulting javascript file will look as if you never imported the module at all.
import {
  ipcRenderer,
  webFrame,
} from 'electron';
import * as fs from 'fs';
import { Server } from 'socket.io';
import { ServerSocketService } from './server-socket.service';

@Injectable({
  providedIn: 'root',
})
export class ElectronService {
  ipcRenderer: typeof ipcRenderer;
  webFrame: typeof webFrame;
  childProcess: typeof childProcess;
  fs: typeof fs;

  constructor(
    private serverSocketService: ServerSocketService,
  ) {
    // Conditional imports
    if (this.isElectron) {
      this.ipcRenderer = window.require('electron').ipcRenderer;
      this.webFrame = window.require('electron').webFrame;

      this.childProcess = window.require('child_process');
      this.fs = window.require('fs');

      // Notes :
      // * A NodeJS's dependency imported with 'window.require' MUST BE present in `dependencies` of both `app/package.json`
      // and `package.json (root folder)` in order to make it work here in Electron's Renderer process (src folder)
      // because it will loaded at runtime by Electron.
      // * A NodeJS's dependency imported with TS module import (ex: import { Dropbox } from 'dropbox') CAN only be present
      // in `dependencies` of `package.json (root folder)` because it is loaded during build phase and does not need to be
      // in the final bundle. Reminder : only if not used in Electron's Main process (app folder)

      // If you want to use a NodeJS 3rd party deps in Renderer process,
      // ipcRenderer.invoke can serve many common use cases.
      // https://www.electronjs.org/docs/latest/api/ipc-renderer#ipcrendererinvokechannel-args
      this.startExpressServer();
    }
  }

  get isElectron(): boolean {
    return !!(window && window.process && window.process.type);
  }

  startExpressServer() {
    const express = window.require('express');
    const path = require('path');

    const app = express();

    const server = app.listen(3000);

    const io = new Server();
    this.serverSocketService.startSocket(io);

    app.use(express.static(path.join(path.dirname(__dirname), 'p-client/')));

    app.get('/', function (req, res) {
      console.log(path.join(path.dirname(__dirname), 'p-client/index.html'));
      res.sendFile(path.join(path.dirname(__dirname), 'p-client/index.html'));
    });

    app.get('/hi', function (req, res) {
      console.log('yeah');
      res.send('hi!!!');
    });
  }
}
