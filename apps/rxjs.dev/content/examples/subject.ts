import { Observable, Subject } from 'rxjs';

function subjectValuesAreMulticastedToManyObservers() {
  const subject = new Subject<number>();

  // 2 Observers attached | Subject
  //    observer A
  subject.subscribe({
  });
  //    observer B
  subject.subscribe({
  });
}

subjectValuesAreMulticastedToManyObservers()

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

// TODO: 👀maintain a registry of MANY listeners👀

function next() {
  const subject = new Subject<number>();

  // 2 Observers attached | Subject
  //    observer A
  subject.subscribe({
    next: (v) => console.log(`next() - observerA - ${v}`),
  });
  //    observer B
  subject.subscribe({
    next: (v) => console.log(`next() - observerB -  ${v}`),
  });

  // 1 value / sent -- to -- ALL observers
  subject.next(1);
  subject.next(2);
}

next();
