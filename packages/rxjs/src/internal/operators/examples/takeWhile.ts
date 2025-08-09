import { interval, takeWhile } from 'rxjs';

// 1. takeWhile(predicate)
const intervalCount = interval(1000);
let count = 0;
const takeFive = intervalCount.pipe(takeWhile(_ => {
    count++;
    return count < 5;
}));
takeFive.subscribe(x => console.log("takeWhile - next - ", x));     // ONCE a value does NOT satisfy -> complete
