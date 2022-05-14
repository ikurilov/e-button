import { IClientGameState } from '../src/app/models/models';

export const SOCKET_EVENT_NAME = 'message';

export enum MessageType {
  WHO_ARE_YOU = 'WHO_ARE_YOU',
  MY_ID = 'MY_ID',
  PING = 'PING',
  PONG = 'PONG',
  NEW_NAME = 'NEW_NAME',
  JOIN_TEAM = 'JOIN_TEAM',
  SMS = 'SMS',
  CLIENT_GAME_STATE = 'CLIENT_GAME_STATE',
  ANSWER = 'ANSWER',
  ANSWER_RESULT = 'ANSWER_RESULT',
}

export enum Teams {
  PURPLE = 'PURPLE',
  YELLOW = 'YELLOW',
  CYAN = 'CYAN',
  AMBER = 'AMBER'
}

interface IMessage {
  date: Date;
}

export interface IMessageWhoAreYou extends IMessage {
  type: MessageType.WHO_ARE_YOU;
}

export interface IMessageMyID extends IMessage {
  type: MessageType.MY_ID;
  name: string;
  clientId: string;
}

export interface IMessagePing extends IMessage {
  type: MessageType.PING;
}

export interface IMessagePong extends IMessage {
  type: MessageType.PONG;
  clientId: string;
}

export interface IMessageNewName extends IMessage {
  type: MessageType.NEW_NAME;
  name: string;
  clientId: string;
}

export interface IMessageJoinTeam extends IMessage {
  type: MessageType.JOIN_TEAM;
  team: Teams;
  clientId: string;
}

export interface IMessageSMS extends IMessage {
  type: MessageType.SMS;
  text: string;
}

export interface IMessageAnswer extends IMessage{
  type: MessageType.ANSWER;
  clientId: string;
}

export interface IMessageAnswerResult extends IMessage {
  type: MessageType.ANSWER_RESULT,
  result: boolean,
}

export interface IMessageClientGameState extends IMessage {
  type: MessageType.CLIENT_GAME_STATE,
  data: IClientGameState;
}

export type ServerMessages = IMessageWhoAreYou | IMessageMyID | IMessagePing | IMessageSMS | IMessageAnswerResult | IMessageClientGameState;
export type ClientMessage = IMessageNewName | IMessageJoinTeam | IMessageAnswer;

