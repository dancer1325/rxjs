import { Observable } from 'rxjs';

const observable = new Observable((subscriber) => {
  // | subscribe, IMMEDIATELY (== synchronously), pushes the values `1`, `2`, `3`
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);

  // +1" | subscribe, pushes `4` & complete
  setTimeout(() => {
    subscriber.next(4);
    subscriber.complete();
  }, 1000);
});

function invokeObservableAndSeeValuesViaSubscribe() {
  console.log('invokeObservableAndSeeValuesViaSubscribe - BEFORE subscribe()');
  observable.subscribe({
    next(x) {
      console.log('invokeObservableAndSeeValuesViaSubscribe - next - value ' + x);
    },
    error(err) {
      console.error('invokeObservableAndSeeValuesViaSubscribe - error - value ' + err);
    },
    complete() {
      console.log('invokeObservableAndSeeValuesViaSubscribe - complete');
    },
  });
  console.log('invokeObservableAndSeeValuesViaSubscribe - AFTER subscribe()');    // BEFORE next(4) & complete -- Reason: setTimeOut()
}

invokeObservableAndSeeValuesViaSubscribe();
