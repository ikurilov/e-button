import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectRemoteConnectInfo } from '../../store/remote.selectors';

@Component({
  selector: 'app-connect-screen',
  templateUrl: './connect-screen.component.html',
  styleUrls: ['./connect-screen.component.scss'],
})
export class ConnectScreenComponent implements OnInit {
  selectConnectInfo = this.store.select(selectRemoteConnectInfo);

  constructor(private store: Store) {}

  ngOnInit(): void {}
}
