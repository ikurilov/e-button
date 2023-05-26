import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-break-screen',
  templateUrl: './break-screen.component.html',
  styleUrls: ['./break-screen.component.scss'],
})
export class BreakScreenComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit(): void {}
}
