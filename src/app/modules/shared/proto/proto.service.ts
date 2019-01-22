import {Injectable} from '@angular/core';
import proto from './bundle.js';
import get from 'lodash-es/get';

@Injectable()
export class ProtoService {

  constructor() {
  }

  buf2hex(buffer) { // buffer is an ArrayBuffer
    return Array.prototype.map.call(new Uint8Array(buffer), x => ('00' + x.toString(16)).slice(-2)).join('');
  }

  public encode(protoObjectName: string, data) {
    const targetObject = get(proto, protoObjectName);
    const protoObject = targetObject.fromObject(data);
    const result = targetObject.encode(protoObject).finish();
    return this.buf2hex(result);
  }

  public decode(protoObjectName: string, data) {
    const targetObject = get(proto, protoObjectName);
    return targetObject.decode(new Uint8Array(data)).toJSON();
  }
}
