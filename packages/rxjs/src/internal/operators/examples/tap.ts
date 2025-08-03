import { map, tap, of, interval, concatMap, take } from 'rxjs';

// 1. use cases
// 1.1 -- as -- debugging
of(Math.random()).pipe(
  tap(console.log),             //  tap((value: T) => void)
  map(n => n > 0.5 ? 'big' : 'small')
).subscribe(console.log);

// 1.2 -- as -- performing side-effects
const source = of(1, 2, 3, 4, 5);
source.pipe(
  tap(n => {                    //  tap((value: T) => void)
    if (n > 3) {
        throw new TypeError(`Value ${ n } is greater than 3`);      // throw an error & stop emission
      }
  })
)
.subscribe({
  next: console.log,
  error: err => console.log(err.message)
});
