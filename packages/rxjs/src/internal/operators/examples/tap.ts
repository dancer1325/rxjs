import { map, tap, of, TapObserver } from 'rxjs';

// 1. use cases
function useCases() {
// 1.1 -- as -- debugging
  of(Math.random()).pipe(
    tap(value => console.log('use cases - as debugging - ', value )),             //  tap((value: T) => void)
    map(n => n > 0.5 ? 'big' : 'small'),
  ).subscribe(x => console.log('use cases - as debugging - ', x));

// 1.2 -- as -- performing side-effects
  const source = of(1, 2, 3, 4, 5);
  source.pipe(
    tap(n => {                    //  tap((value: T) => void)
      if (n > 3) {
        throw new TypeError(`use cases - as performing side-effects - Value ${n} is greater than 3`);      // throw an error & stop emission
      }
    }),
  )
    .subscribe({
      next: x => console.log(`use cases - as performing side-effects - `, x),
      error: err => console.log(err.message),
    });
}
useCases();

// 2. enable perform side effects
function performSideEffects() {
  let logCount = 0;
  const userActivity: string[] = [];

  of(1, 2, 3, 4, 5)
    .pipe(
      tap(value => {
        // Side-effect: increase external variable
        logCount++;

        // Side-effect: keep | external array
        userActivity.push(`User clicked item ${value}`);

        // Side-effect: logging
        console.log(`enable perform side effects - logging - ${value}`);
      }),
    )
    .subscribe(value => {
      console.log(`enable perform side effects - next - ${value}`);  // ⚠️notification NOT modified⚠️
    });

// external state was modified
  console.log(`enable perform side effects - modified state `, logCount);
  console.log(`enable perform side effects - modified state `, userActivity);
}
performSideEffects();

// 3. tap<T>(observerOrNext?: Partial<TapObserver<T>> | ((value: T) => void) | null): MonoTypeOperatorFunction<T> {}
function tapFunctionArgument() {
// 3.1 tap<T>(Partial<TapObserver<T>>): MonoTypeOperatorFunction<T> {}
  const tapObserver: TapObserver<number> = {          // ALL methods MUST be declared
    subscribe: () => console.log(`tapObserver - subscribe`),
    unsubscribe: () => console.log(`tapObserver - unsubscribe`),
    next: (value: number) => console.log(`tapObserver - next - ${value}`),
    complete: () => console.log(`tapObserver - complete`),
    finalize: () => console.log(`tapObserver - finalize`),
    error: (err: any) => console.log(`tapObserver - error - ${err}`),
  };
  of(1, 2, 3, 4, 5)
    .pipe(
      tap(tapObserver),
    )
    .subscribe(value => {
      console.log(`tap - next - ${value}`);  // ⚠️notification NOT modified⚠️
    });

// 3.2 tap<T>((value: T) => void): MonoTypeOperatorFunction<T> {}
  of(1, 2, 3, 4, 5)
    .pipe(
      tap(value => {
        value = value * 2
        console.log('(value: T) => void ', value)
      }),
    )
    .subscribe(value => {
      console.log(`(value: T) => void - next - ${value}`);  // ⚠️notification NOT modified⚠️
    });
}
tapFunctionArgument();

// 4. vs `map` OR `mergeMap`
// 4.1 `map`
of(1, 2, 3, 4, 5)
  .pipe(
    map(value => {
      value = value * 2
      console.log('vs map ', value)
      return value            // modify & return the internal state
    })
  )
  .subscribe(value => {
    console.log(`vs map - next - ${value}`);  // ⚠️notification NOT modified⚠️
  });

// 5. `tap` calls -- , via reference, the -- appropiate callback
// TODO: reference
