import { of, Observable, Subject, Subscription, lastValueFrom, firstValueFrom } from 'rxjs';

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

const data$ = new Observable(subscriber => {
  subscriber.next('data1');
  subscriber.next('data2');
  subscriber.complete();
});

// 1.1  Observable.subscribe(Observer)
data$.subscribe({
  next: value => console.log('Observable.subscribe(Observer) - next', value),
  complete: () => console.log('Observable.subscribe(Observer) - complete')
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
