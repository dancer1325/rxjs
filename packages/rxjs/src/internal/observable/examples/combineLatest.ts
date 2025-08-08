import { timer, combineLatest, delay, startWith, of } from 'rxjs';

// 1. combineLatest(sources: O[])
const firstTimer = timer(0, 1000);    // emit 0, 1, 2... after every second / from NOW
const secondTimer = timer(500, 1000); // emit 0, 1, 2... after every second / from now + 0,5s
const combinedTimers = combineLatest([firstTimer, secondTimer]);      // combineLatest(sources: O[])
combinedTimers.subscribe(value => console.log("combineLatest(sources: O[]) - next - ", value));

// 2. combineLatest(sources: Record<string, O>)
const observables = {
  a: of(1).pipe(delay(1000), startWith(0)),
  b: of(5).pipe(delay(5000), startWith(0)),
  c: of(10).pipe(delay(10000), startWith(0))
};
const combined = combineLatest(observables);    // combineLatest(sources: Record<string, O>)
combined.subscribe(value => console.log("combineLatest(sources: Record<string, O>) - next - ",value));

// 3. combineLatest(emptyObservable)        completes IMMEDIATELY
const emptyObservableFirst = of();
const emptyObservableSecond = of();
const combinedEmpty = combineLatest([emptyObservableFirst, emptyObservableSecond]);
combinedEmpty.subscribe({
  next: value => console.log('combinedEmpty - next - ', value),
  complete: () => console.log('combinedEmpty - completed - true')
});

// 4. "latest" meaning in combineLatest
const observableA = of('A1', 'A2', 'A3', 'A4');     // emit IMMEDIATELY
const observableB = of('B1').pipe(delay(2000));     // emit 1! value, NOW + 2"
const combinedComprehendLatest = combineLatest([observableA, observableB]);   // ONLY emits 1 value / picks observableA's latest emitted value
combinedComprehendLatest.subscribe(value => console.log("\"latest\" meaning in combineLatest - next - ", value));
