import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'verifyResult'
})
export class VerifyResultPipe implements PipeTransform {

  transform(value: any, type: any): any {
    if (!value) {
      return 'none';
    }

    const targetVerifyData = value.find((verifyData) => verifyData.type === type);
    if (!targetVerifyData) {
      return 'none';
    }

    return [
      moment(targetVerifyData.updated_at).format('Do MMM YYYY'),
      targetVerifyData.verifyResult
    ].join(' / ');
  }

}
