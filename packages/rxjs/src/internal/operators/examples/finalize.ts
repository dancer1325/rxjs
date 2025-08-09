import { interval, finalize, tap, noop, timer, take } from 'rxjs';

// 1. callback called | complete
function finalizeCallbackCalledOnComplete() {
  const source = interval(1000);      // emit value / EACH 1"
  const example = source.pipe(
    take(5),            //take ONLY FIRST 5 values
    finalize(() => console.log('callback called | complete - finalize - complete')),    // execute | complete the source observable
  );
  example.subscribe(val => console.log('callback called | complete - next ', val));
}
finalizeCallbackCalledOnComplete();

// 2. callback called | unsubscribe
function finalizeCallbackCalledOnUnsubscribe() {
  const source = interval(100).pipe(
    finalize(() => console.log('callback called | unsubscribe - finalize - callback')),
    tap({
      next: x => console.log('callback called | unsubscribe - tap - next', x),
      error: () => console.log('callback called | unsubscribe - tap - error'),
      complete: () => console.log('callback called | unsubscribe - tap - complete'),
    }),
  );

  const sub = source.subscribe({
    next: x => console.log('callback called | unsubscribe - subscribe - next ', x),
    error: noop,
    complete: () => console.log('callback called | unsubscribe - subscribe - complete'),
  });

  timer(150).subscribe(() => sub.unsubscribe());      // AFTER 150 ms -> trigger unsubscribe() -> trigger finalize()
}
finalizeCallbackCalledOnUnsubscribe();
