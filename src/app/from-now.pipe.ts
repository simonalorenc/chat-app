import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fromNow'
})
export class FromNowPipe implements PipeTransform {
    transform(value: any): string {
      const currentDate = new Date();
      const messageDate = new Date(value);
  
      const timeDifference = currentDate.getTime() - messageDate.getTime();
      const secondsDifference = Math.floor(timeDifference / 1000);
  
      if (secondsDifference < 60) {
        return `${secondsDifference} seconds ago`;
      } else if (secondsDifference < 3600) {
        const minutes = Math.floor(secondsDifference / 60);
        return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
      } else if (secondsDifference < 86400) {
        const hours = Math.floor(secondsDifference / 3600);
        return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
      } else {
        const days = Math.floor(secondsDifference / 86400);
        return `${days} day${days !== 1 ? 's' : ''} ago`;
      }
    }
  }

export const fromNowPipeInjectables: Array<any> = [
  FromNowPipe
];