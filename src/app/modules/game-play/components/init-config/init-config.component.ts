import { Component, OnInit } from '@angular/core';
import { TeamColors } from '../../store/game-play.state';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectEditor } from '../../../editor/state/editor.selectors';
import { take } from 'rxjs';
import { gamePlayActions } from '../../store/game-play.actions';
import { Router } from '@angular/router';

const configOfConfig = {
  throttle: {
    min: 0,
    max: 2000,
    step: 100,
  },
  freeze: {
    min: 0,
    max: 20_000,
    step: 500,
  },
  listeningDuration: {
    min: 0,
    max: 20_000,
    step: 1000,
  },
};

@Component({
  selector: 'app-init-config',
  templateUrl: './init-config.component.html',
  styleUrls: ['./init-config.component.scss'],
})
export class InitConfigComponent implements OnInit {
  allTeams: TeamColors[] = [
    TeamColors.CYAN,
    TeamColors.AMBER,
    TeamColors.PURPLE,
    TeamColors.YELLOW,
  ];

  teamColors = TeamColors;

  public form: FormGroup = new FormGroup({
    teams: new FormArray([
      new FormControl(true),
      new FormControl(true),
      new FormControl(false),
      new FormControl(false),
    ]),
    listeningDurationMS: new FormControl(5000),
    buttonThrottleMS: new FormControl(500),
    freezeTimeMS: new FormControl(10000),
  });

  constructor(private store: Store, private router: Router) {}

  public ngOnInit(): void {
    this.store
      .select(selectEditor)
      .pipe(take(1))
      .subscribe((editor) => {
        this.store.dispatch(
          gamePlayActions.initGameFromEditor({ game: editor }),
        );
      });
  }

  public get throttle(): number {
    return this.form.get('buttonThrottleMS').value;
  }

  public get freeze(): number {
    return this.form.get('freezeTimeMS').value;
  }

  public get listeningDuration(): number {
    return this.form.get('listeningDurationMS').value;
  }

  public submit() {
    let { teams, ...config } = this.form.value;
    let selectedTeams: TeamColors[] = this.allTeams.reduce(
      (previousValue, currentValue, currentIndex) => {
        if (teams[currentIndex]) {
          previousValue.push(currentValue);
        }
        return previousValue;
      },
      [],
    );
    this.store.dispatch(
      gamePlayActions.setGameConfig({
        availableTeams: selectedTeams,
        ...config,
      }),
    );
  }

  public back() {
    this.router.navigate(['/']);
  }

  protected readonly configOfConfig = configOfConfig;
}
