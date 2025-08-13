import { ReplaySubject } from 'rxjs';

// 1. new ReplaySubject()     /     NO initial value can be passed
const replaySubjectNotHasInitialValue = new ReplaySubject();      //
console.log("replaySubjectNotHasInitialValue ", replaySubjectNotHasInitialValue);

// 2. custom TimestampProvider
class CustomTimestampProvider {
  now() {       // required to be TimestampProvider
    return Date.now();
  }
}

const customReplay = new ReplaySubject(2, 2000, new CustomTimestampProvider());

customReplay.next('A');
setTimeout(() => customReplay.next('B'), 1000);
setTimeout(() => {
  customReplay.subscribe(val => console.log('custom TimestampProvider - next ', val));      // ONLY 'B' -- Reason:🧠'A' exceeded windowTime🧠
}, 2500);

// 3. ALTHOUGH emit an error -> keep on replaying PREVIOUS emitted values
function althoughEmitAnErrorKeepOnReplyingPreviousEmittedValues() {
  const replaySubject = new ReplaySubject(3);

  replaySubject.next(1);
  replaySubject.next(2);
  replaySubject.error(new Error('Something wrong'));      // emit an error
  replaySubject.next(3);        // NO emitted -- due to -- previous error

// AFTER error, subscribe | it
  setTimeout(() => {
    replaySubject.subscribe({
      next: value => console.log('ALTHOUGH emit an error -> keep on replaying values - next ', value),            // PREVIOUS emit values are received
      error: err => console.log('ALTHOUGH emit an error -> keep on replaying values - error ', err.message),
      complete: () => console.log('ALTHOUGH emit an error -> keep on replaying values - complete '),
    });
  }, 1000);
}
althoughEmitAnErrorKeepOnReplyingPreviousEmittedValues();
