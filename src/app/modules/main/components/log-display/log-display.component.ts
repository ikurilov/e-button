import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ILogRecord, LoggerService, LogType } from '../../../../services/logger.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-log-display',
  templateUrl: './log-display.component.html',
  styleUrls: ['./log-display.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogDisplayComponent implements OnInit, OnDestroy {
  LogType = LogType;
  log: ILogRecord[] = [];
  private destroySub: Subject<void> = new Subject<void>();

  constructor(public logger: LoggerService, private cdr: ChangeDetectorRef) {
  }

  public ngOnInit(): void {
    this.log = [...this.logger.logs];
    this.logger.onNewRecord.subscribe(
      record => {
        this.log.push(record);
        this.cdr.detectChanges();
      }
    );
  }

  public ngOnDestroy(): void {
    this.destroySub.next();
  }

}
