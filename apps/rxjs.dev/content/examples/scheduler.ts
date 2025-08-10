import { Observable, observeOn, asyncScheduler } from 'rxjs';

// 1. scheduler's data structure
//TODO:

// 2. scheduler's execution context
//TODO:

// 3. scheduler's virtual clock
// 3.1 | real time, SAME
console.log('scheduler\'s virtual clock - system time ', Date.now());
console.log('scheduler\'s virtual clock - asyncScheduler.now ', asyncScheduler.now());

// 4. controls | deliver the notifications
const observable = new Observable((observer) => {
  observer.next(1);
  observer.next(2);
  observer.next(3);
  observer.complete();
}).pipe(
  observeOn(asyncScheduler)
);

console.log('just before subscribe');
observable.subscribe({
  next(x) {
    console.log('got value ' + x);
  },
  error(err) {
    console.error('something wrong occurred: ' + err);
  },
  complete() {
    console.log('done');
  },
});
console.log('just after subscribe');
