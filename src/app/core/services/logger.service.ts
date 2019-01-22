import {Injectable} from '@angular/core';
import isString from 'lodash-es/isString';
import {environment} from '../../../environments/environment';

@Injectable({providedIn: 'root'})
export class Logger {

  private debug: boolean = !environment.production;

  constructor() {
  }

  public info(message?, ...optionalParams): void {
    if (this.debug) {
      const css = 'color:blue';
      const msg = '%c[info] ' + (isString(message) ? message : JSON.stringify(message));
      console.log(msg, css, ...optionalParams);
    }
  }

  public error(message?, ...optionalParams): void {
    if (this.debug) {
      const css = 'color:red';
      const msg = '%c[error] ' + (isString(message) ? message : JSON.stringify(message));
      console.log(msg, css, ...optionalParams);
    }
  }

  public log(message?, ...optionalParams): void {
    if (this.debug) {
      const msg = '[log] ' + (isString(message) ? message : JSON.stringify(message));
      console.log(msg, ...optionalParams);
    }
  }

}
