import { ConnectableObservable, from, Observable, Subject } from 'rxjs';
import { multicast } from 'rxjs/operators'

// 1. subject == special type of Observable + Observer /  values are multicasted -- to -- MANY Observers
function subjectValuesAreMulticastedToManyObservers() {
  const subject = new Subject<number>();

  // 2 Observers attached | Subject
  //    observer A
  subject.subscribe(x => console.log("subjectValuesAreMulticastedToManyObservers - Observer A - next - ", x));
  //    observer B
  subject.subscribe(x => console.log("subjectValuesAreMulticastedToManyObservers - Observer B - next - ", x));

  // can emit events      ==    observable
  subject.next(2);
}
subjectValuesAreMulticastedToManyObservers()

// 2. Observer can NOT differentiate unicast Observable vs Subject
function observerCanNotDifferentiateUnicastObservableOrSubject() {
  // 1! observer
  const observer = {
    next: (v: number) => console.log(`observerCanNotDifferentiateUnicastObservableOrSubject - Value: ${v}`),
    error: (e: any) => console.log(`observerCanNotDifferentiateUnicastObservableOrSubject - Error: ${e}`),
    complete: () => console.log('observerCanNotDifferentiateUnicastObservableOrSubject - Complete'),
  };

  // 1. observable unicast
  const observable = new Observable<number>(subscriber => {
    subscriber.next(1);
    subscriber.next(2);
    subscriber.complete();
  });
  console.log("observerCanNotDifferentiateUnicastObservableOrSubject - observable unicast")
  observable.subscribe(observer);     // .subscribe()       ==  .subscribe() | multicast

  // 2. subject (multicast)
  const subject = new Subject<number>();
  console.log("observerCanNotDifferentiateUnicastObservableOrSubject - subject (multicast)")
  subject.subscribe(observer);        // .subscribe()       ==  .subscribe() | unicast
  subject.next(1);
  subject.next(2);
  subject.complete();
}
observerCanNotDifferentiateUnicastObservableOrSubject();

// 3. maintain a registry of ALL listeners
function maintainARegistryOfALLListeners() {
  const subject = new Subject<number>();

  subject.subscribe(value => console.log(`maintain a registry of ALL listeners - Observer A: ${value}`));
  subject.subscribe(value => console.log(`maintain a registry of ALL listeners - Observer B: ${value}`));
  subject.subscribe(value => console.log(`maintain a registry of ALL listeners - Observer C: ${value}`));

// if you emit a value -> sent to ALL registered listeners    == maintain a list of ALL registered listeners
  subject.next(42);
}
maintainARegistryOfALLListeners();

// 4. unicast
function unicast() {
  const unicastObservable = new Observable(subscriber => {
    console.log('unicast - NEW execution');     // executed / EACH subscriber

    let count = 0;
    const interval = setInterval(() => {
      subscriber.next(++count);
    }, 1000);

    return () => clearInterval(interval);
  });

// FIRST subscription
  const subA = unicastObservable.subscribe(value =>
    console.log(`unicast - Observer A - next ${value}`),
  );

// AFTER 2.5", SECOND subscription
  setTimeout(() => {
    const subB = unicastObservable.subscribe(value =>
      console.log(`unicast - Observer B - next ${value}`),
    );

    // AFTER 5", cleanup
    setTimeout(() => {
      subA.unsubscribe();
      subB.unsubscribe();
    }, 5000);
  }, 2500);
}
unicast();

// 5. multicast
function multicastMeaning() {
  const subject = new Subject();

  let count = 0;
  const interval = setInterval(() => {
    subject.next(++count);
  }, 1000);

// FIRST subscription
  subject.subscribe(value =>
    console.log(`multicast - Observer A - next ${value}`),
  );

// AFTER 2.5", SECOND subscription
  setTimeout(() => {
    // ⚠️this observer read values / emitted AFTER being subscribed⚠️   == SAME execution / ALL observers
    subject.subscribe(value =>
      console.log(`multicast - Observer B - next ${value}`),
    );
  }, 2500);

  setTimeout(() => clearInterval(interval), 6000);
}
multicastMeaning()

// 6. observable.subscribe(subject)         -- Reason:🧠subject is an observer🧠
function subjectAsObserver() {
  const subject = new Subject<number>();

  subject.subscribe({
    next: (v) => console.log(`observable.subscribe(subject) - observerA - next ${v}`),
  });
  subject.subscribe({
    next: (v) => console.log(`observable.subscribe(subject) - observerB - next ${v}`),
  });

  const observable = from([1, 2, 3]);
  observable.subscribe(subject);          // subject -- as -- observer
}
subjectAsObserver();

// 7. multicast()   operator          -- deprecated --
function multicastOperator() {
  const source = from([1, 2, 3]);
  const subject = new Subject();

  // notifications passed -- through a -- Subject
  const multicasted: any = source.pipe(multicast(subject));        // :any         bypass TS error

  multicasted.subscribe({
    next: (v) => console.log(`multicast operator - observerA: ${v}`),
  });
  multicasted.subscribe({
    next: (v) => console.log(`multicast operator - observerB: ${v}`),
  });

  // == under the hood, `source.subscribe(subject)`
  const returnedByConnect = multicasted.connect();        // if you comment it -> NO receive values
  console.log('multicast operator - returnedByConnect - typeof ', typeof returnedByConnect);
  console.log('multicast operator - returnedByConnect - returnedByConnect.constructor.name ', returnedByConnect.constructor.name);      // subscription
}
multicastOperator();
