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

* Observables
  * ways to create
    * `new Observable(function subscribe(subscriber){})`
    * creation operator
      * _Example:_ `of`, `from`, `interval`
  * if you want to subscribe -- via -- Observer
  * execution
    * == deliver `next` / `error` / `complete` notifications -- to the -- Observer
    * may be disposed

### Subscribing to Observables

* `observable.subscribe(observerOrNext)`
  * allows
    * 👀start an "Observable execution"👀/
      * executions INDEPENDENT / EACH observable's observers
    * deliver values or events -- to -- an Observer of that execution
  * if you call `observable.subscribe` -- with an -- observer -> the function `subscribe` | `new Observable(function subscribe(subscriber) {...})` is run -- for that -- given subscriber
  * subscribe to an Observable == calling a function / provide callbacks | data will be delivered to
  * vs event handler APIs
    * ⚠️NOT hold observer list vs hold registered listeners⚠️
    * _Example:_ `addEventListener` / `removeEventListener`

### Executing Observables

* `new Observable(function subscribe(subscriber) {...})`
  * == 💡"Observable execution"💡 /
    * lazy computation
    * ONLY happens / EACH observer subscribed
    * produces MULTIPLE values | time /
      * synchronously OR asynchronously
  * 💡`next*(error|complete)?`💡
    - 👀ALLOWED types of values -- to -- deliver👀
    - `next*`
      - == "Next" notificationS
        - `*` == | Observable Execution, [0, infinite) may be delivered
      - sends a value -- to a -- subscriber
        - _Example:_ Number, String, Object, etc.
    - `(error|complete)?`
      - `|` == OR
      - "Error" notification
        - sends a JavaScript Error OR exception
        - happen 1 OR 0
      - "Complete" notification
        - ❌NOT send a value❌
        - happen 1 OR 0
      - ⚠️if SOME of this is delivered -> AFTERWARD, nothing else can be delivered ⚠️
  * recommendations
    * | `subscribe`, wrap with `try`/`catch` block
      * Reason:🧠if it catches an exception -> deliver an Error notification🧠

### Disposing Observable Executions

* `observable.subscribe`
  * Observer gets attached -- to the -- NEWLY created Observable execution
  * returns `Subscription`
    * == object
    * == 💡ongoing execution💡
    * [MORE](subscription.md)

* `subscription.unsubscribe()`
  * allows
    * cancel ongoing execution | finite time
      * Reason:🧠Observable Executions may be infinite🧠
  * uses
    * avoid wasting computation power OR memory resources

* define custom `unsubscribe()`
  ```
  new Observable(function subscribe(subscriber) {
    ...
    return function unsubscribe() {
      console.log('Custom unsubscribe function called - cleaning up resources');
    };
  });
  ```

* Rx types
  * allows
    * safety
      * Reason:🧠follow Observable Contract🧠
    * composability -- with -- Operators
  * _Example:_ Observable, Observer, and Subscription
