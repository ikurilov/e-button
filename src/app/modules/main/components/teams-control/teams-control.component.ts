import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IClient } from '../../../../services/client-manager.service';
import { Teams } from '../../../../../../models/shared-models';

export const NO_TEAM_NAME = 'Lobby';

@Component({
  selector: 'app-teams-control',
  templateUrl: './teams-control.component.html',
  styleUrls: ['./teams-control.component.scss']
})
export class TeamsControlComponent implements OnInit {
  NO_TEAM_NAME = NO_TEAM_NAME;
  Teams = Teams;

  @Input() players: IClient[] = [];

  @Output() onChangePlayerTeam: EventEmitter<{ player: IClient, newTeam: Teams }> =
    new EventEmitter<{ player: IClient, newTeam: Teams }>();
  @Output() onMeasurePing: EventEmitter<void> = new EventEmitter<void>();
  @Output() onShuffleLobby: EventEmitter<void> = new EventEmitter<void>()



  constructor() {
  }

  ngOnInit(): void {
  }

  public get teamsObject() {
    let tempObj = {};
    this.players.forEach(player => {
      tempObj[player.team || NO_TEAM_NAME] ?
        tempObj[player.team || NO_TEAM_NAME].push(player) :
        tempObj[player.team || NO_TEAM_NAME] = [player]
    });
    let res = [];
    Object.keys(tempObj).forEach(keyTeam => {
      res.push({ name: keyTeam, players: tempObj[keyTeam] });
    })
    return res;
  }

  public measurePing(): void {
    this.onMeasurePing.emit();
  }

  public changePlayerTeam(player: IClient, newTeam: Teams): void {
    this.onChangePlayerTeam.emit({ player, newTeam });
  }

  shuffleLobby() {
    this.onShuffleLobby.emit()
  }
}
