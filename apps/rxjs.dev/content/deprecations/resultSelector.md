# ResultSelector Parameter

* `resultSelector` argument
  * used by
    * SOME operator
  * == mapping function | those operator's result

* |
  * RxJS 6.0,
    * deprecation
      * Reason:🧠
        * 💡can be done -- by -- `map` operator💡
        * increase EVERY operator's bundle size
        * | SOME scenarios,
          * retained | memory -> memory pressure🧠
  * RxJS 8,
    * breaking change

## Operators affected by this Change

- [concatMap](/api/operators/concatMap)
- [concatMapTo](/api/operators/concatMapTo)
- [exhaustMap](/api/operators/exhaustMap)
- [mergeMap](/api/operators/mergeMap)
- [mergeMapTo](/api/operators/mergeMapTo)
- [switchMap](/api/operators/switchMap)
- [switchMapTo](/api/operators/switchMapTo)
