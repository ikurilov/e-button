import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectRemoteScreen } from '../../store/remote.selectors';
import { Observable } from 'rxjs';
import { RemoteScreens } from '../../store/remote.state';

@Component({
  selector: 'app-remote-main-layout',
  templateUrl: './remote-main-layout.component.html',
  styleUrls: ['./remote-main-layout.component.scss'],
})
export class RemoteMainLayoutComponent implements OnInit {
  screenType = RemoteScreens;
  remoteScreen: Observable<RemoteScreens> =
    this.store.select(selectRemoteScreen);
  constructor(private store: Store) {}

  ngOnInit(): void {}
}
