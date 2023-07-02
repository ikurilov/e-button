import { Injectable } from '@angular/core';
import * as childProcess from 'child_process';

// If you import a module but never use any of the imported values other than as TypeScript types,
// the resulting javascript file will look as if you never imported the module at all.
import { ipcRenderer, webFrame } from 'electron';
import * as fs from 'fs';
import * as path from 'path';
import { ServerSocketService } from './server-socket.service';
import { RemoteSocketService } from './remote-socket.service';
import { PlayerEntitySocketService } from './player-entity-socket.service';
import { Store } from '@ngrx/store';
import { selectCurrentSlide } from '../../../modules/game-play/store/game-play.selectors';
import { take } from 'rxjs';
import { QuestionWithImageSlide } from '../../../modules/editor/state/editor.state';

@Injectable({
  providedIn: 'root',
})
export class ElectronService {
  ipcRenderer: typeof ipcRenderer;
  webFrame: typeof webFrame;
  childProcess: typeof childProcess;
  networkInterfaces;
  fs: typeof fs;
  path: typeof path;

  constructor(
    private serverSocketService: ServerSocketService,
    private remoteSocketService: RemoteSocketService,
    private playerEntityService: PlayerEntitySocketService,
    private store: Store,
  ) {
    // Conditional imports
    if (this.isElectron) {
      this.ipcRenderer = window.require('electron').ipcRenderer;
      this.webFrame = window.require('electron').webFrame;

      this.childProcess = window.require('child_process');
      this.fs = window.require('fs');
      this.networkInterfaces = window.require('os').networkInterfaces;
      this.path = window.require('path');

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
      this.startScreenServer();
    }
  }

  get isElectron(): boolean {
    return !!(window && window.process && window.process.type);
  }

  public getIp(): { title: string; ip: string[] }[] | null {
    if (!this.networkInterfaces) {
      return null;
    }
    const nets = this.networkInterfaces();
    let result: { title: string; ip: string[] }[] = [];
    Object.keys(nets).forEach((key) => {
      let tempRes = { title: key, ip: [] };
      nets[key].forEach((net) => {
        if (net.family === 'IPv4' && !net.internal) {
          tempRes.ip.push(net.address);
        }
      });
      if (tempRes.ip.length) {
        result.push(tempRes);
      }
    });
    return result;
  }

  startExpressServer() {
    const express = window.require('express');
    const path = window.require('path');
    const cors = window.require('cors');

    const app = express();

    app.use(
      cors({
        origin: '*',
      }),
    );

    const server = app.listen(3000);

    const io = window.require('socket.io')(server);
    this.playerEntityService.startSocket(io);

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

  startScreenServer() {
    const express = window.require('express');
    const path = window.require('path');
    const cors = window.require('cors');

    const app = express();

    app.use(
      cors({
        origin: '*',
      }),
    );

    const server = app.listen(3001);

    const io = window.require('socket.io')(server);
    this.remoteSocketService.startSocket(io);

    app.use(express.static(path.join(path.dirname(__dirname), 'remoute/')));

    app.get('/', function (req, res) {
      res.sendFile(path.join(path.dirname(__dirname), 'remoute/index.html'));
    });

    app.get('/hi', function (req, res) {
      console.log('yeah');
      res.send('hi, i am screen!!!');
    });

    app.get('/api/question-images', async (req, res) => {
      let sub = this.store
        .select(selectCurrentSlide)
        .pipe(take(1))
        .subscribe((slide) => {
          const images = (slide as QuestionWithImageSlide).images;
          res.send(images);
        });

      res.send(['sosi pisos']);
    });
  }

  // import express from 'express';
  // import path from 'path';
  // import fs from 'fs';
  //
  // const app = express();
  // const port = 3000;
  //
  // // Serve static files from the "public" directory
  // app.use(express.static(path.join(__dirname, 'public')));
  //
  // // Define the route for the image URL and file anywhere on the computer
  // app.get('/image/:filePath', (req, res) => {
  //   const filePath = req.params.filePath;
  //
  //   // Check if the file exists in the "public" directory
  //   const publicFilePath = path.join(__dirname, 'public', filePath);
  //   if (fs.existsSync(publicFilePath)) {
  //     const imageUrl = `http://localhost:${port}/${filePath}`;
  //     res.send(imageUrl);
  //     return;
  //   }
  //
  //   // Check if the file exists anywhere on the computer
  //   const fileStream = fs.createReadStream(filePath);
  //
  //   fileStream.on('error', (error) => {
  //     res.status(404).send('Image not found');
  //   });
  //
  //   fileStream.pipe(res);
  // });
  //
  // app.listen(port, () => {
  //   console.log(`App listening on port ${port}...`);
  // });

  //import express from 'express';
  // import path from 'path';
  // import fs from 'fs';
  //
  // const app = express();
  // const port = 3000;
  //
  // // Serve static files from the "public" directory
  // app.use(express.static(path.join(__dirname, 'public')));
  //
  // // Define the route for the image URL in the "public" directory
  // app.get('/image/:filePath', (req, res) => {
  //   const filePath = req.params.filePath;
  //   const imageUrl = `http://localhost:${port}/${filePath}`;
  //   res.send(imageUrl);
  // });
  //
  // // Define the route for the image file anywhere on the computer
  // app.get('/image-local/:filePath', (req, res) => {
  //   const filePath = req.params.filePath;
  //   const fileStream = fs.createReadStream(filePath);
  //
  //   fileStream.on('error', (error) => {
  //     res.status(404).send('Image not found');
  //   });
  //
  //   fileStream.pipe(res);
  // });
  //
  // app.listen(port, () => {
  //   console.log(`App listening on port ${port}...`);
  // });
}
