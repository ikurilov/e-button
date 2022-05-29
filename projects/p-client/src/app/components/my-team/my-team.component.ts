import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Teams } from '../../../../../../models/shared-models';

@Component({
  selector: 'app-my-team',
  templateUrl: './my-team.component.html',
  styleUrls: ['./my-team.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyTeamComponent implements OnInit {
  Teams = Teams;
  @Input() team?: Teams;

  constructor() { }

  ngOnInit(): void {
  }

  checkTeam() {
    return true;
  }
}
