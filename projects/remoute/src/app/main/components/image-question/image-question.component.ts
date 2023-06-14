import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-image-question',
  templateUrl: './image-question.component.html',
  styleUrls: ['./image-question.component.scss'],
})
export class ImageQuestionComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit(): void {}
}
