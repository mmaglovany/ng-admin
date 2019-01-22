import {Action} from '@ngrx/store';

export const APP_START_AJAX = '[APP] Start ajax';
export const APP_STOP_AJAX = '[APP] Stop ajax';
export const APP_ERROR_AJAX = '[APP] Error ajax';

export class StartAjaxAction implements Action {
  readonly type = APP_START_AJAX;
}

export class StopAjaxAction implements Action {
  readonly type = APP_STOP_AJAX;
}

export class ErrorAjaxAction implements Action {
  readonly type = APP_ERROR_AJAX;
}

export type AppActions = StartAjaxAction | StopAjaxAction;
