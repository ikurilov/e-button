import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-remote-main-layout',
  templateUrl: './remote-main-layout.component.html',
  styleUrls: ['./remote-main-layout.component.scss'],
})
export class RemoteMainLayoutComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit(): void {}
}
