import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectInfos } from '../../store/remote.selectors';

@Component({
  selector: 'app-info-list',
  templateUrl: './info-list.component.html',
  styleUrls: ['./info-list.component.scss'],
})
export class InfoListComponent implements OnInit {
  selectInfoList = this.store.select(selectInfos);

  constructor(private store: Store) {}

  ngOnInit(): void {}
}
