import { of, Observable, Subject, Subscription, lastValueFrom, firstValueFrom, interval } from 'rxjs';

function majorEntities() {
// 1. consumer      == code / subscribes | observable
  function consumer() {
    const observable$ = of(1, 2, 3);

// 1.1 basic == simple function
    observable$.subscribe(value => {
      console.log('consumer - basic - next ', value);       // ONLY -- notified to -- next
    });

// 1.2 complete == object Observer
    observable$.subscribe({
      next: value => console.log('consumer - basic - next ', value),
      error: err => console.log('Error:', err),
      complete: () => console.log('Complete!'),
    });
  }
  consumer();

// 2. producer
  function producer() {
// 2.1 source of values -- are pushed -- to the consumer
// 2.1.1 simple / manual values
    const observable = new Observable(subscriber => {
      // generate values
      subscriber.next(1);
      subscriber.next(2);
      subscriber.next(3);
      subscriber.complete();
    });

// 2.1.2 with WebSocket
    const websocketObservable = new Observable(subscriber => {
      const socket = new WebSocket('ws://localhost:8080');

      socket.onmessage = event => subscriber.next(event.data);
      socket.onerror = error => subscriber.error(error);
      socket.onclose = () => subscriber.complete();

      // | unsubscribe, cleanup
      return () => socket.close();
    });

// 2.1.3 with Array
    const arrayObservable = new Observable(subscriber => {
      const data = [10, 20, 30];

      data.forEach(value => subscriber.next(value));
      subscriber.complete();
    });

// 2.2 ways to create
// 2.2.1 | subscribe, producer -- subscription / 1:1
    const coldObservable = new Observable(subscriber => {
      console.log('producer created | subscribe');
      const intervalId = setInterval(() => {
        subscriber.next(Math.random());
      }, 1000);
      const timeoutId = setTimeout(() => {
        subscriber.complete();
        clearInterval(intervalId);
      }, 10000);
      return () => clearInterval(intervalId);
    });

// create producer1 / this subscribe1 (1:1)
    const subscriptionProducerCreatedOnSubscribe1 = coldObservable.subscribe(x => console.log('producer created | subscribe - subscribe1 ', x));

// create producer2 / this subscribe2 (1:1)
    const subscriptionProducerCreatedOnSubscribe2 = coldObservable.subscribe(x => console.log('producer created | subscribe - subscribe2 ', x));

// 2.2.2 | outside subscribe, producer is created
    const sharedProducer = new Subject();

// SAME producer can be shared -- by -- MULTIPLE subscriptions (1-to-many)
    const subscriptionProducerCreatedOutsideSubscribe1 = sharedProducer.subscribe(x => console.log('producer created | outside subscribe - subscribe1 ', x));
    const subscriptionProducerCreatedOutsideSubscribe2 = sharedProducer.subscribe(x => console.log('producer created | outside subscribe - subscribe2 ', x));
    const subscriptionProducerCreatedOutsideSubscribe3 = sharedProducer.subscribe(x => console.log('producer created | outside subscribe - subscribe3 ', x));

// 1 shared producer send -- to -- ALL consumers
    sharedProducer.next('Hello');
    sharedProducer.next('World');
  }

  producer();

// 3. subscription
  const observable$ = of(1, 2, 3);
  observable$.subscribe(console.log);     // 3.1 subscription   ==   contract BETWEEN producer & consumer / observes values pushed
// 3.2  subscription != `Subscription`
  const sub: Subscription = observable$.subscribe(console.log);

// 4. observable
  function observable() {
    const observable = new Observable(subscriber => {
      // generate values      == producer
      subscriber.next(1);
      subscriber.next(2);
      subscriber.next(3);
      subscriber.complete();
    });
    const observer = {
      next: value => console.log('Observer recibió:', value),
      error: err => console.log('Observer error:', err),
      complete: () => console.log('Observer: completado'),
    };
    observable.subscribe(observer);       // observable enables connect observer -- , via `.subscribe()`, with -- producer
  }

  observable();

  function observer() {
    const observable$ = of(1, 2, 3);

// 5.1 OBSERVER == consumer's manifestation
    const observer = {
      // 5.2.1 ALL handlers
      next: value => console.log('observer == consumer\'s manifestation - next ', value),
      error: err => console.log('observer == consumer\'s manifestation - error ', err),
      complete: () => console.log('observer == consumer\'s manifestation - complete'),
    };

// consumer's manifestation
    observable$.subscribe(observer);

    const partialObserver = {
      // 5.2.2 NOT ALL handlers
      next: value => console.log('observer == consumer\'s manifestation - next ', value),
      complete: () => console.log('observer == consumer\'s manifestation - complete'),
    };
  }

// 5. observer
  observer();
}
majorEntities();

// 1. subscribe
function subscribe() {
  const data$ = new Observable(subscriber => {
    // simple producer
    subscriber.next('data1');
    subscriber.next('data2');
    subscriber.complete();
  });

// 1.1  Observable.subscribe(Observer)
  const subscription = data$.subscribe({              // set up a subscription
    next: value => console.log('Observable.subscribe(Observer) - next', value),
    complete: () => console.log('Observable.subscribe(Observer) - complete'),
  });

// Observable.forEach(Observer)
  data$.forEach(value => {
    console.log('Observable.forEach(Observer) - next ', value);
  });

// lastValueFrom() function
  lastValueFrom(data$).then(last => {
    console.log('lastValueFrom() ', last);
  });

// firstValueFrom() function
  firstValueFrom(data$).then(first => {
    console.log('firstValueFrom() ', first);
  });
}
subscribe();

// 2. finalization
function finalization() {
// 2.1 complete
  const observable$ = new Observable(subscriber => {
    const timer = setInterval(() => {
      subscriber.next('data');
    }, 1000);

    // AFTER 3", simulate completion
    setTimeout(() => {
      subscriber.complete();        // trigger finalization
    }, 3000);

    // FINALIZATION - clean up resources -- used by a -- producer
    return () => {
      console.log('finalization - complete - clean up resources');
      clearInterval(timer);
    };
  });

  observable$.subscribe({
    next: val => console.log('finalization - complete - next ', val),
    complete: () => console.log('finalization - complete - completed'),
  });

// 2.2 error
  const errorObservable$ = new Observable(subscriber => {
    const connection = { active: true };

    setTimeout(() => {
      subscriber.error(new Error('finalization - error - trigger finalization'));  // trigger finalization
    }, 2000);

    // FINALIZATION - clean up resources -- used by a -- producer
    return () => {
      console.log('finalization - error - clean up resources');
      connection.active = false;
    };
  });

  errorObservable$.subscribe({
    next: val => console.log('finalization - error - next ', val),
    error: err => console.log('finalization - error - error ', err.message),
  });

// 2.3 unsubscription
  const infiniteObservable$ = new Observable(subscriber => {
    const interval = setInterval(() => {
      subscriber.next(Math.random());
    }, 500);

    // FINALIZATION - clean up resources -- used by a -- producer
    return () => {
      console.log('finalization - unsubscription - clean up resources');
      clearInterval(interval);
    };
  });

  const subscription = infiniteObservable$.subscribe(
    val => console.log('finalization - unsubscription - next ', val),
  );

// AFTER 2", unsubscribe
  setTimeout(() => {
    subscription.unsubscribe();       // trigger finalization
  }, 2000);
}
finalization();

// 3. unsubscription
function unsubscription() {
  const observable = interval(1000);
  const subscriptionToUnsubscribe = observable.subscribe(x => console.log('unsubscription - next ', x));
  console.log('unsubscription - BEFORE subscriptionToUnsubscribe.closed ', subscriptionToUnsubscribe.closed);      // subscription opened
  setTimeout(() => {
    subscriptionToUnsubscribe.unsubscribe();        // unsubscription
    console.log('unsubscription - AFTER subscriptionToUnsubscribe.closed ', subscriptionToUnsubscribe.closed);    //  subscription closed
  }, 3000);
}
unsubscription();

// 4. observation chain
const sourceObservable$ = of(1, 2, 3, 4, 5);
const chainExample$ = new Observable(subscriber => {
  const sourceSubscription = sourceObservable$.subscribe({
    next: value => {
      console.log(`observation chain ${value} - next`);
      subscriber.next(value * 10); // transform & notify -- to the -- next one
    },
    complete: () => {
      console.log('observation chain - complete');
      subscriber.complete();
    }
  });

  return () => sourceSubscription.unsubscribe();    // unsubscribe is propagated | chain
});

// FINAL consumer
chainExample$.subscribe({
  next: value => console.log('observation chain - next ', value),
  complete: () => console.log('observation chain - complete')
});
