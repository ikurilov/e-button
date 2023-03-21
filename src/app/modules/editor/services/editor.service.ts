import {Injectable} from '@angular/core';
import {EditorState} from "../state/editor.state";
import {ElectronService} from "../../../core/services";

const memeFileName = 'meme-bebe.json'

@Injectable({
  providedIn: 'root'
})
export class EditorService {

  constructor(private electronService: ElectronService) {
  }


  saveToFile(editor: EditorState): void {
    let path = editor.folderPath;
    this.saveJsonToFile(path + `/title.json`, editor);
  }

  saveJsonToFile(filePath: string, data: any): void {
    const jsonData = JSON.stringify(data);
    this.electronService.fs.writeFileSync(filePath, jsonData);
  }

  loadFromFile(filePath: string): EditorState {
    let s: EditorState = this.readJsonFromFile(filePath+`/${memeFileName}`);
    s.folderPath = filePath;
    return s;
  }

  readJsonFromFile(filePath: string): any {
    const jsonData = this.electronService.fs.readFileSync(filePath);
    return JSON.parse(jsonData.toString());
  }

  getFilesRecursive(folderPath: string): { filename: string, path: string }[] {
    let files: { filename: string, path: string }[] = [];

    const filesInFolder = this.electronService.fs.readdirSync(folderPath);

    filesInFolder.forEach(file => {
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
}
