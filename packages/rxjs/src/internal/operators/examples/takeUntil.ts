import { interval, takeUntil, of, Subject } from 'rxjs';

// 1. emits the source Observable's values | TILL `notifier` Observable emits a value
const source = interval(1000);

const stop$ = new Subject();      // used -- as -- notifier | `takeUntil(notifier)`
setTimeout(() => {
  stop$.next('stop');
  stop$.complete();
}, 5000);

const result = source.pipe(takeUntil(stop$));
result.subscribe({
  next: x => console.log("emits the source Observable's values | TILL `notifier` Observable emits a value - next - ", x),
  complete: () => console.log("emits the source Observable's values | TILL `notifier` Observable emits a value - complete")
});
