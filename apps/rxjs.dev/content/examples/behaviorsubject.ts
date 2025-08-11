import { BehaviorSubject } from 'rxjs';

// 1. if new Observer subscribes -> IMMEDIATELY receive the `BehaviorSubject`'s CURRENT value
const subject = new BehaviorSubject(0); // 0 is the initial value

subject.subscribe({
  next: (v) => console.log(`behaviorSubject - newObserveSubscribesImmediatelyGetBehaviorSubject'sCurrentValue - observerA - next ${v}`),
});

subject.next(1);
subject.next(2);

// NEW Observer IMMEDIATELY receive the `BehaviorSubject`'s CURRENT value   == 2
subject.subscribe({
  next: (v) => console.log(`behaviorSubject - newObserveSubscribesImmediatelyGetBehaviorSubject'sCurrentValue - observerB - next  ${v}`),
});

subject.next(3);

// 2. ONLY stores the latest value -- emitted to -- its consumers
const onlyStoreLatestValue = new BehaviorSubject('initial value');
onlyStoreLatestValue.next('first next');
onlyStoreLatestValue.subscribe({
  next: value => console.log("behaviorSubject - onlyStoreLatestValue - next", value)    // ONLY store the LATEST -- emitted to -- its consumers
})
