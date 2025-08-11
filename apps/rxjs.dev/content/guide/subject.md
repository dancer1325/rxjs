# Subject

* RxJS Subject
  * := ⭐️special type of [Observable](observable.md) + [Observer](observer.md)⭐️
    * special type of Observable
      * allows
        * 👀values are multicasted -- to -- MANY Observers👀
        * 👀hit [notifications](glossary-and-semantics.md#notification)👀
      * uses
        * `subscribe` | it
          * -- by -- providing an Observer
            * ⚠️Observer can NOT differentiate unicast Observable vs Subject⚠️
          * Reason:🧠Subject == Observable🧠
      * vs plain Observables
        * multicast vs unicast
      * 👀maintain a registry of ALL listeners👀
        * == EventEmitters
    * observer
      * -> you 👀MAY provide `Observable.subscribe(Subject)`👀
        * -> 💡unicast `Observable` execution is converted -- , via `Subject`, to -- multicast💡
        * == 💡`Observable` execution is shared -- , via `Subject`, to -- MULTIPLE Observers💡

* unicast
  * == INDEPENDENT execution of the Observable / EACH subscribed Observer
    * -> ⚠️EACH observer read ALL values / emitted⚠️

* multicast
  * ❌NOT NEW execution of the Observable / EACH subscribed Observer❌
    * -> ⚠️observers read values / emitted AFTER being subscribed⚠️
    * Reason: 🧠SAME execution / ALL observers🧠
  * registers the given Observer | list of Observers
    * == OTHER libraries & languages' `addListener`

## Multicasted Observables

* "multicasted Observable"
  * passes notifications -- through a -- Subject / MAY have MANY subscribers
    * Reason:🧠make MULTIPLE Observers see the SAME Observable execution🧠

* plain "unicast Observable"
  * passes notifications -- to -- 1 Observer

* `multicast` operator
  * Observers subscribe | underlying Subject /
    * Subject subscribes | source Observable
  * ⚠️deprecated⚠️
  * returns `ConnectableObservable`
    * == Observable + `.connect()` method

* `.connect()`
  * 👀determine WHEN the shared Observable execution will start👀
    * == ❌if you do NOT invoke it -> NO execution❌
  * returns a `Subscription`
    * if you want to cancel the shared Observable execution -> unsubscribe from
    * Reason:🧠use `source.subscribe(subject)` under the hood🧠

### Reference counting

* TODO: Calling `connect()` manually and handling the Subscription is often cumbersome. Usually, we want to _automatically_ connect when the first Observer arrives, and automatically cancel the shared execution when the last Observer unsubscribes.

Consider the following example where subscriptions occur as outlined by this list:

1. First Observer subscribes to the multicasted Observable
2. **The multicasted Observable is connected**
3. The `next` value `0` is delivered to the first Observer
4. Second Observer subscribes to the multicasted Observable
5. The `next` value `1` is delivered to the first Observer
6. The `next` value `1` is delivered to the second Observer
7. First Observer unsubscribes from the multicasted Observable
8. The `next` value `2` is delivered to the second Observer
9. Second Observer unsubscribes from the multicasted Observable
10. **The connection to the multicasted Observable is unsubscribed**

To achieve that with explicit calls to `connect()`, we write the following code:

```ts
import { interval, Subject, multicast } from 'rxjs';

const source = interval(500);
const subject = new Subject();
const multicasted = source.pipe(multicast(subject));
let subscription1, subscription2, subscriptionConnect;

subscription1 = multicasted.subscribe({
  next: (v) => console.log(`observerA: ${v}`),
});
// We should call `connect()` here, because the first
// subscriber to `multicasted` is interested in consuming values
subscriptionConnect = multicasted.connect();

setTimeout(() => {
  subscription2 = multicasted.subscribe({
    next: (v) => console.log(`observerB: ${v}`),
  });
}, 600);

setTimeout(() => {
  subscription1.unsubscribe();
}, 1200);

// We should unsubscribe the shared Observable execution here,
// because `multicasted` would have no more subscribers after this
setTimeout(() => {
  subscription2.unsubscribe();
  subscriptionConnect.unsubscribe(); // for the shared Observable execution
}, 2000);
```

If we wish to avoid explicit calls to `connect()`, we can use ConnectableObservable's `refCount()` method (reference counting), which returns an Observable that keeps track of how many subscribers it has. When the number of subscribers increases from `0` to `1`, it will call `connect()` for us, which starts the shared execution. Only when the number of subscribers decreases from `1` to `0` will it be fully unsubscribed, stopping further execution.

<span class="informal">`refCount` makes the multicasted Observable automatically start executing when the first subscriber arrives, and stop executing when the last subscriber leaves.</span>

Below is an example:

```ts
import { interval, Subject, multicast, refCount } from 'rxjs';

const source = interval(500);
const subject = new Subject();
const refCounted = source.pipe(multicast(subject), refCount());
let subscription1, subscription2;

// This calls `connect()`, because
// it is the first subscriber to `refCounted`
console.log('observerA subscribed');
subscription1 = refCounted.subscribe({
  next: (v) => console.log(`observerA: ${v}`),
});

setTimeout(() => {
  console.log('observerB subscribed');
  subscription2 = refCounted.subscribe({
    next: (v) => console.log(`observerB: ${v}`),
  });
}, 600);

setTimeout(() => {
  console.log('observerA unsubscribed');
  subscription1.unsubscribe();
}, 1200);

// This is when the shared Observable execution will stop, because
// `refCounted` would have no more subscribers after this
setTimeout(() => {
  console.log('observerB unsubscribed');
  subscription2.unsubscribe();
}, 2000);

// Logs
// observerA subscribed
// observerA: 0
// observerB subscribed
// observerA: 1
// observerB: 1
// observerA unsubscribed
// observerB: 2
// observerB unsubscribed
```

The `refCount()` method only exists on ConnectableObservable, and it returns an `Observable`, not another ConnectableObservable.

## BehaviorSubject

* == Subjects' variant /
  * ⚠️ONLY stores the latest value -- emitted to -- its consumers⚠️
  * 💡if new Observer subscribes -> IMMEDIATELY receive the `BehaviorSubject`'s CURRENT value💡

* use cases
  * represent values | time
    * _Example:_
      * event stream of birthdays == Subject
      * stream of a person's age == BehaviorSubject

## ReplaySubject

A `ReplaySubject` is similar to a `BehaviorSubject` in that it can send old values to new subscribers, but it can also _record_ a part of the Observable execution.

<span class="informal">A `ReplaySubject` records multiple values from the Observable execution and replays them to new subscribers.</span>

When creating a `ReplaySubject`, you can specify how many values to replay:

```ts
import { ReplaySubject } from 'rxjs';
const subject = new ReplaySubject(3); // buffer 3 values for new subscribers

subject.subscribe({
  next: (v) => console.log(`observerA: ${v}`),
});

subject.next(1);
subject.next(2);
subject.next(3);
subject.next(4);

subject.subscribe({
  next: (v) => console.log(`observerB: ${v}`),
});

subject.next(5);

// Logs:
// observerA: 1
// observerA: 2
// observerA: 3
// observerA: 4
// observerB: 2
// observerB: 3
// observerB: 4
// observerA: 5
// observerB: 5
```

You can also specify a _window time_ in milliseconds, besides of the buffer size, to determine how old the recorded values can be
* In the following example we use a large buffer size of `100`, but a window time parameter of just `500` milliseconds.

<!-- skip-example -->

```ts
import { ReplaySubject } from 'rxjs';
const subject = new ReplaySubject(100, 500 /* windowTime */);

subject.subscribe({
  next: (v) => console.log(`observerA: ${v}`),
});

let i = 1;
setInterval(() => subject.next(i++), 200);

setTimeout(() => {
  subject.subscribe({
    next: (v) => console.log(`observerB: ${v}`),
  });
}, 1000);

// Logs
// observerA: 1
// observerA: 2
// observerA: 3
// observerA: 4
// observerA: 5
// observerB: 3
// observerB: 4
// observerB: 5
// observerA: 6
// observerB: 6
// ...
```

## AsyncSubject

The AsyncSubject is a variant where only the last value of the Observable execution is sent to its observers, and only when the execution completes.

```js
import { AsyncSubject } from 'rxjs';
const subject = new AsyncSubject();

subject.subscribe({
  next: (v) => console.log(`observerA: ${v}`),
});

subject.next(1);
subject.next(2);
subject.next(3);
subject.next(4);

subject.subscribe({
  next: (v) => console.log(`observerB: ${v}`),
});

subject.next(5);
subject.complete();

// Logs:
// observerA: 5
// observerB: 5
```

The AsyncSubject is similar to the [`last()`](/api/operators/last) operator, in that it waits for the `complete` notification in order to deliver a single value.

## Void subject

Sometimes the emitted value doesn't matter as much as the fact that a value was emitted.

For instance, the code below signals that one second has passed.

```ts
const subject = new Subject<string>();
setTimeout(() => subject.next('dummy'), 1000);
```

Passing a dummy value this way is clumsy and can confuse users.

By declaring a _void subject_, you signal that the value is irrelevant
* Only the event itself matters.

```ts
const subject = new Subject<void>();
setTimeout(() => subject.next(), 1000);
```

A complete example with context is shown below:

```ts
import { Subject } from 'rxjs';

const subject = new Subject(); // Shorthand for Subject<void>

subject.subscribe({
  next: () => console.log('One second has passed'),
});

setTimeout(() => subject.next(), 1000);
```

<span class="informal">Before version 7, the default type of Subject values was `any`
* `Subject<any>` disables type checking of the emitted values, whereas `Subject<void>` prevents accidental access to the emitted value
* If you want the old behavior, then replace `Subject` with `Subject<any>`.</span>
