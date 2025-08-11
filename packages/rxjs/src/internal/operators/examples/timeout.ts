import { timer, timeout, expand, interval, throwError } from 'rxjs';

// TODO: fix and add MORE examples
// 1. if the source does NOT emit BEFORE 7" OR source waits > 5" BETWEEN 2 values -> emit a `TimeoutError`
const getRandomTime = () => Math.round(Math.random() * 10_000);

// observable / waits a random amount of time BETWEEN EACH delivered value
const source$ = timer(getRandomTime())
   .pipe(expand(() => timer(getRandomTime())));

source$
 .pipe(timeout({ first: 7_000, each: 5_000 }))
 .subscribe({
     next: console.log,
     error: console.error
   });


// 2. custom error
class CustomTimeoutError extends Error {
    constructor() {
      super('It was too slow');
      this.name = 'CustomTimeoutError';
    }
}

const slow$ = interval(900);

slow$.pipe(
  timeout({
        each: 1000,
        with: () => throwError(() => new CustomTimeoutError())
    })
)
.subscribe({
    error: console.error
  });
