import { interval, take } from 'rxjs';

const intervalCount = interval(1000);
const takeFive = intervalCount.pipe(take(5));     // take(5)      return Observable / emits ONLY the FIRST 5 values
takeFive.subscribe(x => console.log("take - next - ", x));
