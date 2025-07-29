import { of, map } from 'rxjs';

const observable = of(1,2,3)

observable.pipe(
  map(x => x * 2)
).subscribe((x) => console.log(x))
