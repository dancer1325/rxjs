import { concat, EMPTY, merge, of, catchError, map } from 'rxjs';

EMPTY.subscribe({
    next: () => console.log('EMPTY - next'),            // NO called, because EMPTY does NOT emit items
    complete: () => console.log('EMPTY - complete')
  });

// 2. uses
// 2.1  compose with OTHER Observables
// 2.1.1 NOT contribute with values -- Reason: NOT emit values --
merge(
  of('A', 'B'),
  EMPTY,                  // NO item emitted, ONLY completes
  of('C', 'D')
).subscribe({
  next: value => console.log('EMPTY - uses - compose with OTHER Observables - next ', value),
  complete: () => console.log('EMPTY - uses - compose with OTHER Observables - complete')
});
// 2.1.2 NOT block the compose  -- Reason: IMMEDIATELY complete --
concat(
  of('First'),
  EMPTY,                    // IMMEDIATELY complete / continue -- with the -- next
  of('Second')
).subscribe({
  next: value => console.log('EMPTY - uses - NOT block the compose - next', value),
  complete: () => console.log('EMPTY - uses - NOT block the compose - complete')
});
// 2.1.3 as fallback
of(1, 2, 3).pipe(
  map(value => {
    if (value === 2) throw new Error('Error on value 2');
    return value;
  }),
  catchError(_ => EMPTY)
).subscribe({
  next: value => console.log('EMPTY - uses - as fallback - next ', value),
  complete: () => console.log('EMPTY - uses - as fallback - completed')
});
