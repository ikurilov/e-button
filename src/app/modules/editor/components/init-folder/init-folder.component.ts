import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-init-folder',
  templateUrl: './init-folder.component.html',
  styleUrls: ['./init-folder.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InitFolderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
