import { of, timer, concatMap, interval, takeUntil } from 'rxjs';

// 1. timer(due: number)
const source = of(1, 2, 3);

timer(3000)                   // AFTER 3", start emitting valuez
  .pipe(concatMap(() => source))
  .subscribe(x => console.log("timer(due: number) - next - ", x));

// 2. timer(startDue: number | Date, intervalDuration: number)
timer(0, 1000).subscribe(n => console.log('timer(startDue, intervalDuration) - next ', n));     // comment to stop the program, OTHERWISE, emit infinite values
