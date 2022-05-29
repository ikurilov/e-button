import { EventEmitter, Injectable } from '@angular/core';

export interface ILogRecord {
  date: Date;
  type: LogType;
  description: string[];
}

export enum LogType {
  NewPlayer = 'NewPlayer',
  GoOnline = 'GoOnline',
  GoOffline = 'GoOffline',
  JoinTeam = 'JoinTeam',
  PlayerAnswer = 'PlayerAnswer',
  LateForAnswer = 'LateForAnswer',
  AnswerResult = 'AnswerResult'
}

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  public logs: ILogRecord[] = [];
  public onNewRecord: EventEmitter<ILogRecord> = new EventEmitter<ILogRecord>();

  constructor() { }

  public write(type: LogType, description: string[]) {
    let newRecord: ILogRecord = {
      date: new Date(),
      type,
      description
    }
    this.onNewRecord.emit(newRecord);
    this.logs.push(newRecord);
  }
}
