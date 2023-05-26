import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { selectPlayers } from '../../players-store/players.selectors';
import { PlayerEntity } from '../../players-store/players.state';
import { TeamColors } from '../../store/game-play.state';

@Component({
  selector: 'app-team-board',
  templateUrl: './team-board.component.html',
  styleUrls: ['./team-board.component.scss'],
})
export class TeamBoardComponent {
  teamColors = TeamColors;

  public players = this.store.select(selectPlayers);

  public teams: Observable<{ team?: TeamColors; players: PlayerEntity[] }[]> =
    this.players.pipe(
      map((players) => {
        const teams = players.reduce((acc, player) => {
          if (!acc[player.team]) {
            acc[player.team] = [];
          }
          acc[player.team].push(player);
          return acc;
        }, {} as { [key in TeamColors]: PlayerEntity[] });
        return Object.keys(teams).map((team) => ({
          team: team as TeamColors,
          players: teams[team as TeamColors],
        }));
      }),
    );

  constructor(private store: Store) {}
}
