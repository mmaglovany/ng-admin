import {Pipe, PipeTransform} from '@angular/core';
import sortBy from 'lodash-es/sortBy';

@Pipe({
  name: 'orderBy', pure: false
})
export class OrderByPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return sortBy(value, args[0]);
  }

}
