import { of, switchMap } from 'rxjs';

// 1. based on source Observable's values -> generate a NEW observable
const switched = of(1, 2, 3)
  .pipe(
    switchMap(x => of(x, x ** 2, x ** 3))
  );
switched.subscribe(x => console.log(`switchMap - generate a NEW observable - next `, x));   // emit in order: projection of 1, projection of 2, projection of 3
