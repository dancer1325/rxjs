import { of, map, catchError, take } from 'rxjs';

// 1. catch the error & create a NEW observable
function catchErrorAndCreateNewObservable() {
  of(1, 2, 3, 4, 5)
    .pipe(
      map(n => {
        if (n === 4) {
          throw 'four!';
        }
        return n;
      }),
      catchError(_ => of('I', 'II', 'III', 'IV', 'V')),        // 💡subscribe ALSO | NEW observable💡
    )
    .subscribe(x => console.log('catch the error & create a NEW observable - next ', x));
}
catchErrorAndCreateNewObservable();

// 2. retry the caught source Observable    ==    `retry()` operator
function retryCaughtSourceObservable() {
  of(1, 2, 3, 4, 5)
    .pipe(
      map(n => {
        if (n === 4) {
          throw 'four!';
        }
        return n;
      }),
      catchError((_, caught) => caught),        // 💡subscribe ALSO | NEW observable💡      `_`, because `error` is NOT used          `caught` == source observable
      // return caught      ==    retry
      take(30),
    )
    .subscribe(x => console.log('retry the caught source Observable - next ', x));
}
retryCaughtSourceObservable();

// 3. catch the error & throws another error
function catchErrorAndThrowAnotherError() {
  of(1, 2, 3, 4, 5)
    .pipe(
      map(n => {
        if (n === 4) {
          throw 'four!';
        }
        return n;
      }),
      catchError(err => {
        throw 'error in source. Details: ' + err;       // throw an error
      }),
    )
    .subscribe({
      next: x => console.log('catch the error & throws another error - next ', x),
      error: err => console.log('catch the error & throws another error - error ', err),
    });
}
catchErrorAndThrowAnotherError();

// 4. catchError()        ignores notifications
function ignoreNotifications() {
  of(1, 2, 3)
    .pipe(
      map(_ => {
        throw 'Error';
      }),
      catchError(_ => of(4, 5, 6)));         // NOT hear notifications
}
ignoreNotifications();

// 5. return a function / returns an Observable
of(1,2,3)
.pipe(
  map(_ => {
    throw 'Error';
  }),
  catchError(_ => of(4, 5, 6)),
  map(x => {
    console.log("return a function / returns an Observable ", x);
    return x;  // Reason:🧠required to return an observable🧠
  })
)
.subscribe();  // required to log the PREVIOUS map
