* RxJS
  * == 💡library -- , via Observables, for -- reactive programming💡
  * allows
    * making it easier -- to -- compose asynchronous & event-based programs -- via -- observable sequences
  * == 👀rewrite of [Reactive-Extensions/RxJS](https://github.com/Reactive-Extensions/RxJS)👀 /
    * BETTER
      * performance,
      * modularity,
      * debuggable call stacks,
    * MOSTLY backwards compatible
  * provides
    * [`Observable`](./guide/observable)
      * == core type
      * == invokable collection -- of -- FUTURE values or events
    * satellite types
      * `Observer`
        * == collection of callbacks /
          * knows how to listen values / delivered -- by the -- `Observable`
      * `Subjects`
        * == EventEmitter
        * ONLY way of multicasting a value or event -- to -- MULTIPLE Observers
      * `Schedulers`
        * == centralized dispatchers / control concurrency
        * uses
          * coordinate when computation happens
            * _Example:_ `setTimeout` or `requestAnimationFrame`
      * `Subscription`
        * == execution of an Observable
        * uses
          * cancel the execution
    * operators
      * == pure functions
        * inspired -- by -- `Array` methods (`map`, `filter`, `reduce`, `every`, etc)
        * enable a functional programming style
      * allow
        * handling asynchronous events -- as -- collections

* [guide](guide)
* [deprecations](deprecations)
* [examples](examples)
* [reference](/packages/rxjs)
