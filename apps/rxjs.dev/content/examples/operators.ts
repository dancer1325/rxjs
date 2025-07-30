import {
  of,
  map,
  first,
  interval,
  concatAll,
  mergeAll,
  switchAll,
  mergeMap,
  concatMap,
  switchMap,
  pipe,
  filter, Observable,
} from 'rxjs';

// 2. creation operators
// 2.1 of()
const observable = of(1, 2, 3);
// 2.2 interval()
const observableViaInterval = interval(1000 /* number of milliseconds */);


// 1. pipeable operators
observable.pipe(map((x) => x * x))    // 1.1 -- map() --
  .pipe(first())                                      // 1.2 first()
  .subscribe((v) => console.log(`operators - value: ${v}`));      // observer / created | subscribe the observable


// 5. pipeable operator -- via -- NOT recommended style       -- op1()(obs) --
first()(observable)
map((x: number) => x * x)(observable);


// 6. Higher-order observables
function higherOrderObservables() {
  const numbers$ = of(1, 2, 3);

// Create higher-order observable (Observable of Observables)
  const higherOrder$ = numbers$.pipe(
    map(n => of(n * 10, n * 20)),  // EACH number creates a NEW Observable
  );
  higherOrder$.subscribe(innerObs => {
    console.log('Received inner Observable:', innerObs);
    innerObs.subscribe(value => console.log('  Inner value:', value));
  });


// Flattening methods:
// 6.1 concatAll()
  numbers$.pipe(
    map(n => of(n * 10, n * 20)),
    concatAll(),
  ).subscribe(value => console.log('concatAll:', value));

// 6.2 mergeAll()
  numbers$.pipe(
    map(n => of(n * 10, n * 20)),
    mergeAll(),
  ).subscribe(value => console.log('mergeAll:', value));

// 6.3 switchAll()
  numbers$.pipe(
    map(n => of(n * 10, n * 20)),
    switchAll(),
  ).subscribe(value => console.log('switchAll:', value));

// 6.4 concatMap()
  numbers$.pipe(
    concatMap(n => of(n * 10, n * 20)),
  ).subscribe(value => console.log('concatMap:', value));

// 6.5 mergeMap()
  numbers$.pipe(
    mergeMap(n => of(n * 10, n * 20)),
  ).subscribe(value => console.log('mergeMap:', value));

// 6.6 switchMap()
  numbers$.pipe(
    switchMap(n => of(n * 10, n * 20)),
  ).subscribe(value => console.log('switchMap:', value));
}
higherOrderObservables();

// 7. create custom operators
// 7.1 -- via -- pipe()
function discardOddDoubleEven() {
  return pipe(                          // pipe()       !=      Observable.pipe()
    filter((v: number) => !(v % 2)),
    map((v) => v + v)
  );
}

of(1, 2, 3, 4, 5, 6, 7, 8, 9)
  .pipe(
    discardOddDoubleEven(),
  )
  .subscribe((x) => console.log("discard odd double even ", x));

// 7.2 -- from -- scratch
function delay<T>(delayInMillis: number) {
  // function / subscribe | this observable -> this function is called
  return (observable: Observable<T>) =>
    new Observable<T>((subscriber) => {
      const allTimerIDs = new Set<NodeJS.Timeout>();
      let hasCompleted = false;
      const subscription = observable.subscribe({
        next(value) {
          // TODO: Start a timer to delay the next value
          // from being pushed.
          const timerID = setTimeout(() => {
            subscriber.next(value);
            // after we push the value, we need to clean up the timer timerID
            allTimerIDs.delete(timerID);
            // If the source has completed, and there are no more timers running,
            // we can complete the resulting observable.
            if (hasCompleted && allTimerIDs.size === 0) {
              subscriber.complete();
            }
          }, delayInMillis);

          allTimerIDs.add(timerID);
        },
        error(err) {
          // errors MUST be propagated
          subscriber.error(err);
        },
        complete() {
          hasCompleted = true;
          // if timers are running -> NOT complete YET
          if (allTimerIDs.size === 0) {
            subscriber.complete();
          }
        },
      });

      // finalization logic / invoked | result errors, completes, OR unsubscribed
      return () => {
        subscription.unsubscribe();
        // Clean up our timers.
        allTimerIDs.forEach(timerID => {
          clearTimeout(timerID);
        });
      };
    });
}


of(1, 2, 3)
  .pipe(delay(1000))
  .subscribe(console.log);
