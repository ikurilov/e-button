import { Injectable } from '@angular/core';
import { EditorState, initialEditorState } from '../state/editor.state';
import { ElectronService } from '../../../core/services';

const memeFileName = 'meme-bebe.json';

export interface FileListItem {
  fileName: string;
  url: string;
  type: 'audio' | 'image';
  path: string;
  isUsed?: boolean;
  w2hRatio?: number;
}

@Injectable({
  providedIn: 'root',
})
export class EditorService {
  private audioFileTypes = ['mp3', 'wav', 'ogg'];
  private imageFileTypes = ['jpg', 'jpeg', 'png'];
  constructor(private electronService: ElectronService) {}

  async getFilesFromDir(directoryPath: string): Promise<FileListItem[]> {
    const fs = this.electronService.fs;
    const path = this.electronService.path;

    const readFilesRecursively = (
      dirPath: string,
    ): { path: string; type: 'image' | 'audio' }[] => {
      const files = fs.readdirSync(dirPath);
      const allFiles: { path: string; type: 'image' | 'audio' }[] = [];

      files.forEach((file) => {
        const filePath = path.join(dirPath, file);
        const fileStats = fs.statSync(filePath);

        if (fileStats.isDirectory()) {
          allFiles.push(...readFilesRecursively(filePath));
        } else if (
          this.imageFileTypes.some((fileType) => file.endsWith(fileType))
        ) {
          allFiles.push({ path: filePath, type: 'image' });
        } else if (
          this.audioFileTypes.some((fileType) => file.endsWith(fileType))
        ) {
          allFiles.push({ path: filePath, type: 'audio' });
        }
      });

      return allFiles;
    };

    const filesList: { path: string; type: 'image' | 'audio' }[] =
      readFilesRecursively(directoryPath);

    const result = await Promise.all(
      filesList.map(async (fileObj) => {
        const fileName = path.basename(fileObj.path);
        const fileExtension = path.extname(fileName).slice(1);

        if (fileObj.type === 'audio') {
          const fileData = await fs.promises.readFile(fileObj.path);
          return {
            type: 'audio' as const,
            fileName,
            path: fileObj.path,
            url: `data:audio/${fileExtension};base64,${fileData.toString(
              'base64',
            )}`,
          };
        }

        if (fileObj.type === 'image') {
          const { height, width } = this.electronService.sizeOf.imageSize(
            fileObj.path,
          );
          const fileData = await fs.promises.readFile(fileObj.path);
          return {
            type: 'image' as const,
            w2hRatio: width / height,
            fileName,
            path: fileObj.path,
            url: `data:image/${fileExtension};base64,${fileData.toString(
              'base64',
            )}`,
          };
        }
      }),
    );

    return result;
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
      // todo:  unix path
      return this.loadFromFile(path + '/' + memeFileName);
    }
    let newEditor: EditorState = {
      ...initialEditorState,
      folderPath: path,
    };
    this.saveToFile(newEditor);
    return newEditor;
  }
}
