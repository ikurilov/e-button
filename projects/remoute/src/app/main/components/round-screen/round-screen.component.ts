import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectRemoteSlide } from '../../store/remote.selectors';
import { Observable } from 'rxjs';
import { RoundSlide } from '../../../../../../../src/app/modules/editor/state/editor.state';

@Component({
  selector: 'app-round-screen',
  templateUrl: './round-screen.component.html',
  styleUrls: ['./round-screen.component.scss'],
})
export class RoundScreenComponent implements OnInit {
  public slide: Observable<RoundSlide> = this.store.select(
    selectRemoteSlide,
  ) as Observable<RoundSlide>;

  constructor(private store: Store) {}

  ngOnInit(): void {}
}
