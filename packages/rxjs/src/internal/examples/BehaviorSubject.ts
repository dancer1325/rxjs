import { BehaviorSubject } from 'rxjs';

const subject = new BehaviorSubject(3);                           // 3 == initial value
//const subjectWithoutInitialValue = new BehaviorSubject();       // NOT ALLOWED skipping the initial value

subject.subscribe({
  next: (v) => console.log(`behaviorSubject - newObserverSubscribesBeforeEmitting - next ${v}`),
});

subject.next(2);
subject.next(1);

subject.subscribe({
  next: (v) => console.log(`behaviorSubject - newObserverSubscribesAfterEmitting - next ${v}`),     // ONLY hear the CURRENT value
});
