import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject, Subscription, throttleTime } from 'rxjs';
import { pClientActions } from '../../state/p-client.actions';
import {
  selectAnsweringResult,
  selectAnsweringTeam,
  selectIsMyTeamAnswering,
  selectMyTeam,
  selectPClientPhase,
  selectThrottle,
} from '../../state/p-client.selectors';
import { PClientService } from '../../state/p-client.service';
import { PClientPhase } from '../../state/p-client.state';
import { TeamColors } from '../../../../../../src/app/modules/game-play/store/game-play.state';

const ANSWER_RESULT_DURATION = 3000;

@Component({
  selector: 'app-actions-and-info',
  templateUrl: './actions-and-info.component.html',
  styleUrls: ['./actions-and-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionsAndInfoComponent implements OnInit {
  Teams = TeamColors;
  public myTeam = this.store.select(selectMyTeam);
  public phase = this.store.select(selectPClientPhase);
  public isMyTeamAnswering = this.store.select(selectIsMyTeamAnswering);

  public answeringTeam = this.store.select(selectAnsweringTeam);

  public answeringResult = this.store.select(selectAnsweringResult);

  public throttle = this.store.select(selectThrottle);

  private pushSub: Subject<void> = new Subject<void>();

  private pushSubscription: Subscription | null = null;

  public phases = PClientPhase;

  constructor(
    private store: Store,
    private cdr: ChangeDetectorRef,
    private pClientService: PClientService,
  ) {
    // todo: freeze time
    this.throttle.subscribe((throttleMS) => {
      if (this.pushSubscription) {
        this.pushSubscription.unsubscribe();
      }
      this.pushSubscription = this.pushSub
        .pipe(throttleTime(throttleMS))
        .subscribe(() => {
          this.store.dispatch(pClientActions.pushAnswer());
        });
    });
  }

  public ngOnInit(): void {}

  public answer(): void {
    this.pushSub.next();
  }

  public changeTeam(): void {
    this.pClientService.changeTeam().then((team) => {
      this.store.dispatch(pClientActions.changeTeam({ team }));
    });
  }
}
