# Introduction

* ReactiveX
  * == 💡[Observer pattern](https://en.wikipedia.org/wiki/Observer_pattern) + [Iterator pattern](https://en.wikipedia.org/wiki/Iterator_pattern) + [functional programming with collections](http://martinfowler.com/articles/collection-pipeline/#NestedOperatorExpressions)💡
  * use cases
    * 💡manage sequences of events💡

* RxJS
  * allows
    * produce values -- via -- pure functions
      * -> less prone to errors
        * Reason:🧠avoid mess up your state🧠
  * [flow's operators](operators.md)
    * allows
      * control how the events flow -- through -- your observables
      * transform the values passed -- through -- your observables
    * `scan(value => callback)` operator
      * 's work == `reduce`'s | arrays
      * `callback`'s return value
        * == NEXT value exposed
          * == NEXT time / callback runs
