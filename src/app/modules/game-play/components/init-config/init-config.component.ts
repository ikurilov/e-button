import { Component, OnInit } from '@angular/core';
import { TeamColors } from '../../store/game-play.state';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectEditor } from '../../../editor/state/editor.selectors';
import { take } from 'rxjs';
import { gamePlayActions } from '../../store/game-play.actions';
import { Router } from '@angular/router';

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
  });

  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {
    this.store
      .select(selectEditor)
      .pipe(take(1))
      .subscribe((editor) => {
        this.store.dispatch(
          gamePlayActions.initGameFromEditor({ game: editor }),
        );
      });
  }

  public submit() {
    let formValue = this.form.value;
    let selectedTeams: TeamColors[] = this.allTeams.reduce(
      (previousValue, currentValue, currentIndex) => {
        if (formValue.teams[currentIndex]) {
          previousValue.push(currentValue);
        }
        return previousValue;
      },
      [],
    );
    this.store.dispatch(
      gamePlayActions.setGameConfig({ availableTeams: selectedTeams }),
    );
  }

  back() {
    this.router.navigate(['/']);
  }
}
