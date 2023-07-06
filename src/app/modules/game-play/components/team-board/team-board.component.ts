import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, Observable, withLatestFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import { selectPlayers } from '../../players-store/players.selectors';
import { PlayerEntity } from '../../players-store/players.state';
import { TeamColors } from '../../store/game-play.state';
import { selectConfig, selectTeamScore } from '../../store/game-play.selectors';
import { gamePlayActions } from '../../store/game-play.actions';
import { playersActions } from '../../players-store/players.actions';

@Component({
  selector: 'app-team-board',
  templateUrl: './team-board.component.html',
  styleUrls: ['./team-board.component.scss'],
})
export class TeamBoardComponent {
  public teamColors = TeamColors;

  public score = this.store.select(selectTeamScore);
  public config = this.store.select(selectConfig);

  public displayScore = this.score.pipe(
    withLatestFrom(this.config),
    map(([score, config]) => {
      return config.availableTeams.map((team: TeamColors) => ({
        team,
        score: score[team],
      }));
    }),
  );

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

  public teamsData = combineLatest([
    this.config,
    this.players,
    this.score,
  ]).pipe(
    map(([config, players, score]) => {
      return [
        ...config.availableTeams.map((team: TeamColors) => ({
          team,
          score: score[team],
          players: players.filter((player) => player.team === team),
        })),
        {
          team: 'Lobby',
          players: players.filter((player) => !player.team),
        },
      ];
    }),
  );

  constructor(private store: Store) {}

  isTeam(team: any): boolean {
    return !!TeamColors[team];
  }

  deletePlayer(player: PlayerEntity) {
    this.store.dispatch(playersActions.deletePlayer({ id: player.id }));
  }
}
