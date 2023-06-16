import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  selectRemoteConnectInfo,
  selectRemoteSlide,
} from '../../store/remote.selectors';
import { SlideType } from '../../../../../../../src/app/modules/editor/state/editor.state';

@Component({
  selector: 'app-remote-main-layout',
  templateUrl: './remote-main-layout.component.html',
  styleUrls: ['./remote-main-layout.component.scss'],
})
export class RemoteMainLayoutComponent implements OnInit {
  public connectInfo = this.store.select(selectRemoteConnectInfo);

  public slide = this.store.select(selectRemoteSlide);

  public slideType = SlideType;
  constructor(private store: Store) {}

  ngOnInit(): void {}

  protected readonly SlideType = SlideType;
}
