import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { RoundSlide } from '../../../../../../../src/app/modules/editor/state/editor.state';
import { Observable } from 'rxjs';
import { selectRemoteSlide } from '../../store/remote.selectors';

@Component({
  selector: 'app-result-screen',
  templateUrl: './result-screen.component.html',
  styleUrls: ['./result-screen.component.scss'],
})
export class ResultScreenComponent implements OnInit {
  public slide: Observable<RoundSlide> = this.store.select(
    selectRemoteSlide,
  ) as Observable<RoundSlide>;

  constructor(private store: Store) {}

  ngOnInit(): void {}
}
