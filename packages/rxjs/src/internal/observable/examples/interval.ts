import { interval, take } from 'rxjs';

const numbers = interval(1000);                         // emit items / EACH 1000 ms
const takeFourNumbers = numbers.pipe(take(4));
takeFourNumbers.subscribe(x => console.log('Next: ', x));
