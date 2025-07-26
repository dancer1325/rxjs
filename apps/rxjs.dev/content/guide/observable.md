# Observable

* Observables
  * == ⭐️lazy Push collections / MULTIPLE values⭐️
  * ⚠️if you want to invoke the Observable & see these values -> subscribe | it⚠️

|          | Single                                                                                                                                                                   | Multiple                                                                                                                                                                                                                                             |
|----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Pull** | [`Function`](https://developer.mozilla.org/en-US/docs/Glossary/Function) <br/> &nbsp;&nbsp; lazy evaluated computation <br/> &nbsp;&nbsp; \| invoke it, returns 1! value | [`Iterator`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols) <br/> &nbsp;&nbsp; lazy evaluated computation <br/> &nbsp;&nbsp; \| iterate it, sync return `[0, infinite)` |
| **Push** | [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) <br/> &nbsp;&nbsp; may OR NOT return 1 value                               | [`Observable`](/api/index/class/Observable) <br/> &nbsp;&nbsp; lazy evaluated computation <br/> &nbsp;&nbsp; \| invoke it, sync OR async return `[0, infinite)`                                                                                      |

## Pull vs Push

* Pull & Push
  * protocols / describe 👀how a data Producer can communicate -- with a -- data Consumer👀


|          | Producer                                         | Consumer                                       |
| -------- |--------------------------------------------------|------------------------------------------------|
| **Pull** | **Passive** == ⭐️produces data \| request them⭐️ | **Active** == ⭐️decides when to request data⭐️ |
| **Push** | **Active:** produces data at its own pace.       | **Passive:** reacts to received data.          |

### Pull systems,
* Consumer
  * determines when it receives data -- from the -- data Producer
* Producer
  * ⚠️itself is unaware of when the data will be delivered -- to the -- Consumer⚠️
* _Examples:_
  * _Example1:_ ALL JavaScript Function
    * function == Producer of data
    * code / calls the function == consumer of the function -- by -- "pulling" out 1! return value
  * _Example2:_ [generator functions & iterators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*) (`function*`)
    * iterator == producer
    * code / calls `iterator.next()` == consumer / pull out MULTIPLE values -- from the -- iterator

### Push system
* Producer
  * determines when to send data -- to the -- Consumer
* Consumer
  * ⚠️itself is unaware of when it will receive that data⚠️
* _Examples:_
  * _Example1:_ promises
    * promise == Producer
      * delivers a resolved value -- to -- registered callbacks
      * 👀responsible for: determining precisely when value is "pushed" -- to the -- callbacks👀
        * != functions
    * registered callbacks == consumers
  * _Example2:_ Observables
    * Observable == Producer
      * MULTIPLE values -- to -- Observers
    * Observers == Consumers



<span class="informal">For more info about what to use when converting Observables to Promises, please refer to [this guide](/deprecations/to-promise).</span>

## Observables == generalizations of functions

* Observables
  * ❌!= EventEmitters❌
    * EXCEPT TO,
      * ⚠️observables are multicasted -- via -- RxJS Subjects⚠️
    * Reason: 🧠
      * eager execution vs lazy
      * side effects vs shared execution🧠
  * ❌!= Promises | MULTIPLE values❌
  * == 💡functions / 0 arguments + ALLOW MULTIPLE values + PUSH system💡
    * 0 arguments
      * == ❌`.subscribe()` does NOT receive arguments❌
    * invoke function vs `.subscribe()`
    * Reason:🧠
      * BOTH are lazy computations
      * "calling" OR "subscribing" == isolated operation
        * 2 function calls -> 2 separate side effects
        * 2 Observable subscribes -> 2 separate side effects🧠
  * ❌!= asynchronous❌
    * == function
    * Reason: 🧠they can deliver values either synchronously OR asynchronously🧠
      * != function
        * Reason: 🧠ONLY can be sync🧠

## Anatomy of an Observable

Observables are **created** using `new Observable` or a creation operator, are **subscribed** to with an Observer, **execute** to deliver `next` / `error` / `complete` notifications to the Observer, and their execution may be **disposed**. These four aspects are all encoded in an Observable instance, but some of these aspects are related to other types, like Observer and Subscription.

Core Observable concerns:

- **Creating** Observables
- **Subscribing** to Observables
- **Executing** the Observable
- **Disposing** Observables

### Creating Observables

The `Observable` constructor takes one argument: the `subscribe` function.

The following example creates an Observable to emit the string `'hi'` every second to a subscriber.

```ts
import { Observable } from 'rxjs';

const observable = new Observable(function subscribe(subscriber) {
  const id = setInterval(() => {
    subscriber.next('hi');
  }, 1000);
});
```

<span class="informal">Observables can be created with `new Observable`. Most commonly, observables are created using creation functions, like `of`, `from`, `interval`, etc.</span>

In the example above, the `subscribe` function is the most important piece to describe the Observable. Let's look at what subscribing means.

### Subscribing to Observables

The Observable `observable` in the example can be _subscribed_ to, like this:

```ts
observable.subscribe((x) => console.log(x));
```

It is not a coincidence that `observable.subscribe` and `subscribe` in `new Observable(function subscribe(subscriber) {...})` have the same name. In the library, they are different, but for practical purposes you can consider them conceptually equal.

This shows how `subscribe` calls are not shared among multiple Observers of the same Observable. When calling `observable.subscribe` with an Observer, the function `subscribe` in `new Observable(function subscribe(subscriber) {...})` is run for that given subscriber. Each call to `observable.subscribe` triggers its own independent setup for that given subscriber.

<span class="informal">Subscribing to an Observable is like calling a function, providing callbacks where the data will be delivered to.</span>

This is drastically different to event handler APIs like `addEventListener` / `removeEventListener`. With `observable.subscribe`, the given Observer is not registered as a listener in the Observable. The Observable does not even maintain a list of attached Observers.

A `subscribe` call is simply a way to start an "Observable execution" and deliver values or events to an Observer of that execution.

### Executing Observables

The code inside `new Observable(function subscribe(subscriber) {...})` represents an "Observable execution", a lazy computation that only happens for each Observer that subscribes. The execution produces multiple values over time, either synchronously or asynchronously.

There are three types of values an Observable Execution can deliver:

- "Next" notification: sends a value such as a Number, a String, an Object, etc.
- "Error" notification: sends a JavaScript Error or exception.
- "Complete" notification: does not send a value.

"Next" notifications are the most important and most common type: they represent actual data being delivered to a subscriber. "Error" and "Complete" notifications may happen only once during the Observable Execution, and there can only be either one of them.

These constraints are expressed best in the so-called _Observable Grammar_ or _Contract_, written as a regular expression:

```none
next*(error|complete)?
```

<span class="informal">In an Observable Execution, zero to infinite Next notifications may be delivered. If either an Error or Complete notification is delivered, then nothing else can be delivered afterwards.</span>

The following is an example of an Observable execution that delivers three Next notifications, then completes:

```ts
import { Observable } from 'rxjs';

const observable = new Observable(function subscribe(subscriber) {
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);
  subscriber.complete();
});
```

Observables strictly adhere to the Observable Contract, so the following code would not deliver the Next notification `4`:

```ts
import { Observable } from 'rxjs';

const observable = new Observable(function subscribe(subscriber) {
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);
  subscriber.complete();
  subscriber.next(4); // Is not delivered because it would violate the contract
});
```

It is a good idea to wrap any code in `subscribe` with `try`/`catch` block that will deliver an Error notification if it catches an exception:

```ts
import { Observable } from 'rxjs';

const observable = new Observable(function subscribe(subscriber) {
  try {
    subscriber.next(1);
    subscriber.next(2);
    subscriber.next(3);
    subscriber.complete();
  } catch (err) {
    subscriber.error(err); // delivers an error if it caught one
  }
});
```

### Disposing Observable Executions

Because Observable Executions may be infinite, and it's common for an Observer to want to abort execution in finite time, we need an API for canceling an execution. Since each execution is exclusive to one Observer only, once the Observer is done receiving values, it has to have a way to stop the execution, in order to avoid wasting computation power or memory resources.

When `observable.subscribe` is called, the Observer gets attached to the newly created Observable execution. This call also returns an object, the `Subscription`:

```ts
const subscription = observable.subscribe((x) => console.log(x));
```

The Subscription represents the ongoing execution, and has a minimal API which allows you to cancel that execution. Read more about the [`Subscription` type here](./guide/subscription). With `subscription.unsubscribe()` you can cancel the ongoing execution:

```ts
import { from } from 'rxjs';

const observable = from([10, 20, 30]);
const subscription = observable.subscribe((x) => console.log(x));
// Later:
subscription.unsubscribe();
```

<span class="informal">When you subscribe, you get back a Subscription, which represents the ongoing execution. Just call `unsubscribe()` to cancel the execution.</span>

Each Observable must define how to dispose resources of that execution when we create the Observable using `create()`. You can do that by returning a custom `unsubscribe` function from within `function subscribe()`.

For instance, this is how we clear an interval execution set with `setInterval`:

```ts
import { Observable } from 'rxjs';

const observable = new Observable(function subscribe(subscriber) {
  // Keep track of the interval resource
  const intervalId = setInterval(() => {
    subscriber.next('hi');
  }, 1000);

  // Provide a way of canceling and disposing the interval resource
  return function unsubscribe() {
    clearInterval(intervalId);
  };
});
```

Just like `observable.subscribe` resembles `new Observable(function subscribe() {...})`, the `unsubscribe` we return from `subscribe` is conceptually equal to `subscription.unsubscribe`. In fact, if we remove the ReactiveX types surrounding these concepts, we're left with rather straightforward JavaScript.

```ts
function subscribe(subscriber) {
  const intervalId = setInterval(() => {
    subscriber.next('hi');
  }, 1000);

  return function unsubscribe() {
    clearInterval(intervalId);
  };
}

const unsubscribe = subscribe({ next: (x) => console.log(x) });

// Later:
unsubscribe(); // dispose the resources
```

The reason why we use Rx types like Observable, Observer, and Subscription is to get safety (such as the Observable Contract) and composability with Operators.
