import { of, map, take, skip, takeUntil, EMPTY } from 'rxjs';

// 1. OperatorFunction is referentially transparent
const source$ = of(1, 2, 3, 4, 5);

// 1.1 OperatorFunction / NOT change anything
const takeInfinity$ = source$.pipe(take(Infinity));  // take(Infinity)    == NOT change anything
const skipZero$ = source$.pipe(skip(0));             // skip(0)           == NOT change anything

// SAME Observable reference   == SAME Observable
console.log('OperatorFunction is referentially transparent - NOT change anything - takeInfinity$ === source$ ', takeInfinity$ === source$);   // TODO: Why are they DIFFERENT?
console.log('OperatorFunction is referentially transparent - NOT change anything - skipZero$ === source$ ', skipZero$ === source$);           // TODO: Why are they DIFFERENT?

// 1.2 OperatorFunction / change something
const takeTwo$ = source$.pipe(take(2));
const skipOne$ = source$.pipe(skip(1));
const doubled$ = source$.pipe(map(x => x * 2));

// DIFFERENT Observable reference   == NEW Observable created
console.log('OperatorFunction is referentially transparent - change something - takeTwo$ !== source$ ', takeTwo$ !== source$);
console.log('OperatorFunction is referentially transparent - change something - skipOne$ !== source$ ', skipOne$ !== source$);
console.log('OperatorFunction is referentially transparent - change something - doubled$ !== source$ ', doubled$ !== source$);

// 2. if Operators' inputs == `ObservableInput` (== "notifier") -> MUST ONLY recognize `next` "notifications"
// 2.1 reacts -- to -- `next` notifier
const notifierWithValue$ = of('stop');                    // emit & complete
source$.pipe(takeUntil(notifierWithValue$)).subscribe({
  next: value => console.log('Operators\' inputs == `ObservableInput` - emit `next` notification - next - ', value),
  error: err => console.log('Operators\' inputs == `ObservableInput` - emit `next` notification - error - ', err),
  complete: () => console.log('Operators\' inputs == `ObservableInput` - emit `next` notification - complete')
});

// 2.2 NO reacts -- to -- `complete` notifier
const notifierOnlyComplete$ = EMPTY;                      // NO emit values & IMMEDIATELY ONLY complete
source$.pipe(takeUntil(notifierOnlyComplete$)).subscribe({
  next: value => console.log('Operators\' inputs == `ObservableInput` - emit `complete` notification - next - ', value),        // ⚠️keep on emitting⚠️
  error: err => console.log('Operators\' inputs == `ObservableInput` - emit `complete` notification - error - ', err),
  complete: () => console.log('Operators\' inputs == `ObservableInput` - emit `complete` notification - complete')
});

