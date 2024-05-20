export interface IConsole {}

export enum ConsoleEventTypes {
  apiCall = 'api call',
  apiPost = 'POST api',
  apiGet = 'GET api',
  apiPatch = 'PATCH api',
  apiDelete = 'DELETE api',
  click = 'click',
  waiting = 'waiting',
  recieving = 'recieving',
  init = 'initializing',
  success = 'success',
  error = 'error',
  restart = 'restart',
}

export interface IConsoleEvent {
  message: string;
  status?: string;
  type: ConsoleEventTypes;
  data?: any;
  id: string;
  time?: Date;
}
