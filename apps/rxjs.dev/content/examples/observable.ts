import { Observable, of } from 'rxjs';
import EventEmitter = require('node:events');

// 1. define observable     ==    producer
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

// 2. invoke observable -- via -- .subscribe(observer)
//    observer      ==    consumer
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

// 3. PULL systems
function pullJSFunction() {
// 3.1.1 function()                 == producer
  function getName() {                  //      passive     -- Reason:🧠produces data | request them🧠
    console.log('Execute a function ...');
    return 'Juan';
  }

// 3.1.2 code / calls the function == consumer
  const name1 = getName();              //      active     -- Reason:🧠decides when to request data🧠
  console.log(name1);
}

// 3.1 ALL JS function follows pull system
pullJSFunction();

function pullGeneratatorFunctionAndIterator() {
// 3.2.1  producer
  function* getNumbers() {            //      passive     -- Reason:🧠produces data | request them🧠
    console.log('Generating numbers...');
    yield 1;
    yield 2;
    yield 3;
  }

// iterator   ==  producer
  const iterator = getNumbers();

// 3.2.2 consumer
// code / calls `iterator.next()` == consumer                 //      active     -- Reason:🧠decides when to request data🧠
  console.log(iterator.next());       // consumer throws the FIRST value
  console.log(iterator.next());       // Consumer throws the SECOND value
  console.log(iterator.next());       // Consumer throws the THIRD value
  console.log(iterator.next());       // Consumer tries to throw, BUT there is NO MORE
}

// 3.2 generator functions & iterators
pullGeneratatorFunctionAndIterator();

// 4. push system
function pushPromise() {
// 4.1 promise                      == producer
  // 4.1.1    promise == producer
  const promiseProducer = new Promise((resolve) => {
    console.log('Promise created, processing...');
    setTimeout(() => {
      resolve('Data ready!');       // decide when to send data
    }, 2000);
  });

// 4.2 registered callback          == consumer
// itself is unaware of when it will receive that data
  promiseProducer.then((value) => {
    console.log('push system - 1 received:', value);
  });
  promiseProducer.then((value) => {
    console.log('Consumer - 2 received:', value);
  });
}
pushPromise();

// 5. observables == functions / 0 arguments + ALLOW MULTIPLE values + PUSH system
function observablesAreFunctionsWithZeroArgumentsAndMultipleValues() {
// 5.1 -- as -- function
  function fooFunction() {
    console.log('fooFunction');
    return 42;              // return 1! value
    //return 24;            death code      == NEVER executed
  }

  // lazy     -- Reason:🧠needs being invoke it🧠 --
  const x = fooFunction.call(this);         // foo.call(this)   == foo()
  console.log('fooFunction - x ', x);
  const y = fooFunction.call(this);         // foo.call(this)   == foo()      --      this call is isolated -- to -- PREVIOUS one --
  console.log('fooFunction - y ', y);

  function fooFunctionWithArguments(argument1: number) {
    console.log('fooFunctionWithArguments');
    return argument1;              // return 1! value
  }

  const z = fooFunctionWithArguments(36);
  console.log('fooFunctionWithArguments - z ', z);

// 5.2 -- as -- observable
  const fooObservable = new Observable((subscriber) => {
    console.log('fooObservable');
    subscriber.next(42);        // FIRST value returned
    subscriber.next(24);        // SECOND value returned
  });

  // lazy     -- Reason:🧠needs `subscribe()` 🧠 --
  // read ALL of these FIRSTLY, PREVIOUS to pass to AFTER subscriber      ==    ⚠️NOT async⚠️
  fooObservable.subscribe((x) => {          // .subscribe()       ==   NOT receive arguments
    console.log('fooObservable - x ', x);
  });
  fooObservable.subscribe((y) => {          // this `.subscribe()` is isolated -- to -- PREVIOUS one --
    console.log('fooObservable - y ', y);
  });
}
observablesAreFunctionsWithZeroArgumentsAndMultipleValues.call(this);

// 6. observables != eventEmitter
function observablesAreNotEventEmitters() {
// 6.1 eventEmitter has eager execution
  const emitter = new EventEmitter();

  console.log('Creating EventEmitter...');
  setTimeout(() => {
    console.log('EventEmitter emitting data');
    emitter.emit('data', 'Hello from EventEmitter');      // ⚠️executed IMMEDIATELY     ==  WITHOUT listeners⚠️
  }, 1000);

// AFTERWARD, you can add listeners / ⚠️share SAME execution⚠️
  emitter.on('data', (value) => {
    console.log('Listener 1:', value);
  });
}
observablesAreNotEventEmitters();

// 7. observables     can deliver values either synchronously OR asynchronously
function observablesCanDeliverSyncOrAsyncValues() {
// 7.1    sync
  const observableSync = new Observable((subscriber) => {
    subscriber.next(42);
    subscriber.next(100); // "return" another value
    subscriber.next(200); // "return" yet another
  });

  console.log('observableSync - before');
  observableSync.subscribe((x) => {
    console.log('observableSync - x ', x);
  });
  console.log('observableSync - after');

// 7.2    async
  const observableAsync = new Observable((subscriber) => {
    subscriber.next(42);
    subscriber.next(100);
    subscriber.next(200);
    setTimeout(() => {
      subscriber.next(300);       // happens asynchronously
    }, 1000);
  });

  console.log('observableAsync - before');
  observableAsync.subscribe((x) => {
    console.log('observableAsync - x', x);
  });
  console.log('observableAsync - after');
}
observablesCanDeliverSyncOrAsyncValues();

// 8. create observables
function waysToCreateObservables() {
// 8.1    `new Observable(function subscribe(subscriber){})`
  const observableCreationViaNew = new Observable(function subscribe(subscriber) {
    // emit 'hi' / 1" -- to the -- subscriber
    const id = setInterval(() => {
      subscriber.next('hi');
    }, 1000);
    console.log('observableCreationViaNew ', id);
  });
  console.log('observableCreationViaNew ', observableCreationViaNew);
// 8.2    creation operator
  const observableCreationViaOf = of(1, 2, 3);
  console.log('observableCreationViaOf ', observableCreationViaOf);
  return observableCreationViaOf;
}
const observableCreationViaOf = waysToCreateObservables();

// 9. subscribe()
function subscribingToObservables() {
// 9.1 start an observable execution
  observableCreationViaOf.subscribe(x => console.log('.subscribe() - FIRST ', x));
  observableCreationViaOf.subscribe(x => console.log('.subscribe() - SECOND  ', x));    // INDEPENDENT -- to -- PREVIOUS one

// 9.2
  let executionCount = 0;
  const observableToSubscribeDefiningSubscriberFunction = new Observable((subscriber) => {
    console.log(`🚀 Execution #${executionCount} started`);
    executionCount++;
    subscriber.next(`observableToSubscribeDefiningSubscriberFunction - Value from execution #${executionCount}`);
    subscriber.complete();
  });

// Observer 1
  observableToSubscribeDefiningSubscriberFunction.subscribe((value) => {
    console.log('observableToSubscribeDefiningSubscriberFunction - Observer 1 received:', value);
  });

// Observer 2
  observableToSubscribeDefiningSubscriberFunction.subscribe((value) => {
    console.log('observableToSubscribeDefiningSubscriberFunction - Observer 2 received:', value);
  });

// 9.3    subscribe to an Observable == calling a function / provide callbacks | data will be delivered to
// 9.3.1  function / accepts callbacks -- to -- deliver data
  function functionWhichProvideCallbacksOnWhichDataAreDeliveredTo(onSuccess, onError, onComplete) {
    onSuccess('First data');
    onSuccess('Second data');

    setTimeout(() => {
      onSuccess('Async data');
      onComplete();
    }, 1000);
  }

// call function -- providing -- callbacks | deliver data
  functionWhichProvideCallbacksOnWhichDataAreDeliveredTo(
    (data) => console.log('Success:', data),        // callback -- for -- data
    (error) => console.error('Error:', error),      // callback -- for -- errors
    () => console.log('Completed!'),                 // callback -- to -- complete
  );

// 9.3.2  observable
  const observableSubscribeSimilarCallAFunctionsWithCallbacks = new Observable((subscriber) => {
    console.log('Observable executing...');

    // Simulate processing
    subscriber.next('First data');
    subscriber.next('Second data');

    setTimeout(() => {
      subscriber.next('Async data');
      subscriber.complete();
    }, 1000);
  });

  observableSubscribeSimilarCallAFunctionsWithCallbacks.subscribe({
    next: (data) => console.log('Success:', data),     // callback -- for -- data
    error: (error) => console.error('Error:', error),  // callback -- for -- errors
    complete: () => console.log('Completed!'),          // callback -- to -- complete
  });

// 9.4  vs event handler APIs
// 9.4.1 NOT hold observer list vs hold registered listeners
// 9.4.1.1    event handler API
  const emitter = new EventEmitter();
  let clickCount = 0;

  function handler1() {
    clickCount++;
    console.log(`Handler 1 - click #${clickCount}`);
  }

  function handler2() {
    console.log(`Handler 2 - click #${clickCount}`);
  }

  // Register listeners - they get ADDED to a list
  emitter.on('click', handler1);
  emitter.on('click', handler2);

  // Emit event - ALL listeners receive the SAME event
  console.log('--- Emitting click event ---');
  emitter.emit('click'); // Both handlers execute

  // Remove specific listener
  emitter.removeListener('click', handler1);
  emitter.emit('click'); // Only handler2 executes

// 9.4.1.2    observable does NOT hold the observer list
  const observableNotHoldObserverList = new Observable((subscriber) => {
    console.log('🚀 New execution started');
    subscriber.next('Data from execution');
  });

  const subscription1 = observableNotHoldObserverList.subscribe((data) => {
    console.log('Observer 1:', data);
  });

  const subscription2 = observableNotHoldObserverList.subscribe((data) => {
    console.log('Observer 2:', data);
  });

  subscription1.unsubscribe();    // OWN subscription removes the subscriber    == NOT hold -- by the -- observable
}
subscribingToObservables();

// 10.  executing observables
// 10.1   error OR complete   are FINAL values
const observableWithFinalValues = new Observable(function subscribe(subscriber) {
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);
  subscriber.complete();
  subscriber.next(4);         // NOT delivered
});
observableWithFinalValues.subscribe(x => console.log('error OR complete are FINAL values - observableWithFinalValues ', x));

// 10.2   | `subscribe`, wrap with `try`/`catch` block
const observableWrapped = new Observable(function subscribe(subscriber) {
  try {
    subscriber.next(1);
    subscriber.next(2);
    subscriber.next(3);
    throw new Error("check wrap");
    subscriber.complete();    // death code     ==  NOT reached
  } catch (err) {
    subscriber.error(err);          // if error is caught -> delivers the error
  }
});
observableWrapped.subscribe(x => console.log('observableWrapped ', x));
console.log("observableWrapped AFTERWARD");
// TODO:
