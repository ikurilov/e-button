import { Component, OnDestroy, OnInit } from '@angular/core';
import { Teams } from '../../../../../../models/shared-models';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { IGameConfig } from '../../../../models/models';
import { GameManagerService } from '../../../../services/game-manager.service';

const ALL_TEAMS = [Teams.PURPLE, Teams.YELLOW, Teams.CYAN, Teams.AMBER,]

@Component({
  selector: 'app-game-options',
  templateUrl: './game-options.component.html',
  styleUrls: ['./game-options.component.scss']
})
export class GameOptionsComponent implements OnInit, OnDestroy {

  public allTeams = ALL_TEAMS;
  Teams = Teams;
  private destroySub = new Subject<void>()

  public form: FormGroup = new FormGroup(
    {
      wrongAnswerFreezeTimeSec: new FormControl(0),
      forbidTeamChanging: new FormControl(false),
      onlyOneAnswer: new FormControl(false),
      teams: new FormArray([
        new FormControl(true),
        new FormControl(true),
        new FormControl(false),
        new FormControl(false),
      ])
    }
  )

  constructor(private gameService: GameManagerService) {
  }

  public ngOnInit(): void {
    let initialValue: any = { ...this.gameService.gameConfigSub.value };
    initialValue.teams = ALL_TEAMS.map(team => !initialValue.teams.some(allTeam => allTeam === team));
    this.form.reset(this.gameService.gameConfigSub.value);
    this.form.valueChanges.pipe(takeUntil(this.destroySub)).subscribe(changes => {
      let newConfig: IGameConfig = {
        teams: ALL_TEAMS.reduce((previousValue, currentValue, currentIndex) => {
          if (changes.teams[currentIndex]) {
            previousValue.push(ALL_TEAMS[currentIndex]);
          }
          return previousValue;
        }, []),
        forbidTeamChanging: changes.forbidTeamChanging,
        wrongAnswerFreezeTimeSec: changes.wrongAnswerFreezeTimeSec >= 0 ? changes.wrongAnswerFreezeTimeSec : 0,
        onlyOneAnswer: changes.onlyOneAnswer,
      };
      this.gameService.gameConfigSub.next(newConfig);
    })
  }

  public ngOnDestroy(): void {
    this.destroySub.next();
  }

}
