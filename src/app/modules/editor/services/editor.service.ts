import { Injectable } from '@angular/core';
import { EditorState, initialEditorState } from '../state/editor.state';
import { ElectronService } from '../../../core/services';
import { Store } from '@ngrx/store';

const memeFileName = 'meme-bebe.json';

@Injectable({
  providedIn: 'root',
})
export class EditorService {
  constructor(private electronService: ElectronService) {}

  getImagesFromDir(directoryPath: string): { fileName: string; url: string }[] {
    const fs = this.electronService.fs;
    const path = this.electronService.path;

    function readImagesRecursively(dirPath: string): string[] {
      const files = fs.readdirSync(dirPath);
      const allFiles: string[] = [];

      files.forEach((file) => {
        const filePath = path.join(dirPath, file);
        const fileStats = fs.statSync(filePath);

        if (fileStats.isDirectory()) {
          allFiles.push(...readImagesRecursively(filePath));
        } else if (
          file.endsWith('.jpg') ||
          file.endsWith('.jpeg') ||
          file.endsWith('.png')
        ) {
          allFiles.push(filePath);
        }
      });

      return allFiles;
    }

    const imagePaths = readImagesRecursively(directoryPath);

    return imagePaths.map((filePath) => {
      const fileName = path.basename(filePath);
      const fileExtension = path.extname(fileName).slice(1);

      return {
        fileName: fileName,
        url: `data:image/${fileExtension};base64,${fs
          .readFileSync(filePath)
          .toString('base64')}`,
      };
    });
  }

  saveToFile(editor: EditorState): void {
    let path = editor.folderPath;
    this.saveJsonToFile(path + `/${memeFileName}`, editor);
  }

  saveJsonToFile(filePath: string, data: any): void {
    const jsonData = JSON.stringify(data);
    this.electronService.fs.writeFileSync(filePath, jsonData);
  }

  loadFromFile(filePath: string): EditorState {
    let s: EditorState = this.readJsonFromFile(filePath);
    return s;
  }

  readJsonFromFile(filePath: string): any {
    const jsonData = this.electronService.fs.readFileSync(filePath);
    return JSON.parse(jsonData.toString());
  }

  getFilesRecursive(folderPath: string): { filename: string; path: string }[] {
    let files: { filename: string; path: string }[] = [];

    const filesInFolder = this.electronService.fs.readdirSync(folderPath);

    filesInFolder.forEach((file) => {
      const filePath = folderPath + '/' + file;
      const fileStat = this.electronService.fs.statSync(filePath);

      if (fileStat.isDirectory()) {
        files = files.concat(this.getFilesRecursive(filePath));
      } else {
        files.push({ filename: file, path: filePath });
      }
    });

    return files;
  }

  getFiles(folderPath: string): { filename: string; path: string }[] {
    let files: { filename: string; path: string }[] = [];

    const filesInFolder = this.electronService.fs.readdirSync(folderPath);

    filesInFolder.forEach((file) => {
      const filePath = folderPath + '/' + file;
      const fileStat = this.electronService.fs.statSync(filePath);

      if (!fileStat.isDirectory()) {
        files.push({ filename: file, path: filePath });
      }
    });

    return files;
  }

  initFileOrFromFile(path: any): EditorState {
    let files = this.getFiles(path);
    let file = files.find((f) => f.filename === memeFileName);
    if (file) {
      return this.loadFromFile(path + '\\' + memeFileName);
    }
    let newEditor: EditorState = {
      ...initialEditorState,
      folderPath: path,
    };
    this.saveToFile(newEditor);
    return newEditor;
  }
}
