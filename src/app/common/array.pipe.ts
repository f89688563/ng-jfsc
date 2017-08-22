import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'array'
})
export class ArrayPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (typeof(value) == 'string') {
    	value = value.split(',');
    }
    return value;
  }

}
