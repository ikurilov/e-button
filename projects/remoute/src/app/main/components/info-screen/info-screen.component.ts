import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { InfoSlide } from '../../../../../../../src/app/modules/editor/state/editor.state';
import { selectRemoteSlide } from '../../store/remote.selectors';

@Component({
  selector: 'app-info-screen',
  templateUrl: './info-screen.component.html',
  styleUrls: ['./info-screen.component.scss'],
})
export class InfoScreenComponent implements OnInit {
  public slide: Observable<InfoSlide> = this.store.select(
    selectRemoteSlide,
  ) as Observable<InfoSlide>;

  constructor(private store: Store) {}

  ngOnInit(): void {}
}
