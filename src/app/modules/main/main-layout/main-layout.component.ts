import { Component, OnInit } from '@angular/core';
import { GameManagerService } from '../../../services/game-manager.service';
import { ClientManagerService } from '../../../services/client-manager.service';
import { AudioService } from '../../../services/audio.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  constructor(public gs: GameManagerService,
              public audio: AudioService,
              public clientService: ClientManagerService) { }

  ngOnInit(): void {
  }

}
