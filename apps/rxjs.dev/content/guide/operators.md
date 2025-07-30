# RxJS Operators

* RxJS' operators
  * ==💡functions💡
    * if you want to use it -> invoke it
  * PRETTY useful
  * allows
    * compose complex asynchronous code -- via -- declarative manner

## What are operators?

* built-in kinds
  * [Pipeable Operators](#pipeable-operators)
  * [Creation Operators](#creation-operators)

### Pipeable Operators

* == 💡pure function💡 /
  * 's input == 1! Observable
  * 's return == ANOTHER Observable
    * 💡if you subscribe | output observable -> ALSO subscribe | input Observable💡
  * ⭐️ways to write⭐️
    * `op()(obs)`
      * == function
      * if you combine MULTIPLE operators -> `op4()(op3()(op2()(op1()(obs))))`
    * `obs.pipe(op1());`
      * if you combine MULTIPLE operators -> `obs.pipe(op1(), op2(), op3(), op4());`
        * == `op4()(op3()(op2()(op1()(obs))))`
      * 👀recommended👀
        * Reason: 🧠easier to read🧠
* `observableInstance.pipe(operator)` OR `observableInstance.pipe(operatorFactory())`
  * `operatorFactory`
    * == function /
      * 's arguments
        * can be taken -- to --
          * set the context
          * return a Pipeable Operator
        * belong -- to the -- operator’s lexical scope
  * _Example of `operatorFactory()`:_ [`filter(...)`](/api/operators/filter) & [`mergeMap(...)`](/api/operators/mergeMap)
* == piped -- to -- Observables /
  * ⚠️return a NEW Observable⚠️
    * ❌NOT change the EXISTING Observable instance❌
      * == 👀pure operation👀
    * 's subscription logic -- is based on the -- FIRST Observable

### Creation Operators

* == standalone functions / create a NEW Observable -- via --
  * SOME COMMON predefined behavior OR
  * by joining OTHER Observables
* [list](#creation-operators-list)

## Higher-order Observables

* == 👀Observables of Observables👀
  * NOT common

* how to work with them?
  * 👀flatten them👀
    * == converting a higher-order Observable -- into an -- ordinary Observable
    * [`concatAll()`](/api/operators/concatAll) operator
    * [_join operators_](#join-operators)
    * [`mergeAll()`](/api/operators/mergeAll)
    * [`switchAll()`](/api/operators/switchAll)
    * [`exhaustAll()`](/api/operators/exhaustAll)
    * RxJS flattening operators / combination of 2
      * [`flatMap()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap)
        * == [`map()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) + [`flat()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat)
      * [`concatMap()`](/api/operators/concatMap)
      * [`mergeMap()`](/api/operators/mergeMap)
      * [`switchMap()`](/api/operators/switchMap)
      * [`exhaustMap()`](/api/operators/exhaustMap)

## Marble diagrams

* == visual representations -- of -- how operators work
  * == input Observable(s) + operator + operator's parameters + output Observable
  * == 💡emission of values ("marbles") | Observable execution💡
  * time flows -- to the -- right
* allows
  * 👀explaining BETTER operators work👀
    * Reason:🧠| 1 concept, can EXIST DIFFERENT behaviors 🧠
      * _Example:_ operators / related to time, could
        * delay,
        * sample,
        * throttle,
        * debounce value emissions

![](../../src/assets/images/guide/marble-diagram-anatomy.svg)

* ALTERNATIVE TO
  * textual descriptions
    * Reason:🧠OFTEN NOT enough🧠

## Categories of operators

* -- based on -- purposes

### Creation Operators List

- [`ajax`](/api/ajax/ajax)
- [`bindCallback`](/api/index/function/bindCallback)
- [`bindNodeCallback`](/api/index/function/bindNodeCallback)
- [`defer`](/api/index/function/defer)
- [`EMPTY`](/api/index/const/EMPTY)
- [`from`](/api/index/function/from)
- [`fromEvent`](/api/index/function/fromEvent)
- [`fromEventPattern`](/api/index/function/fromEventPattern)
- [`generate`](/api/index/function/generate)
- [`interval`](/api/index/function/interval)
- [`of`](/api/index/function/of)
- [`range`](/api/index/function/range)
- [`throwError`](/api/index/function/throwError)
- [`timer`](/api/index/function/timer)
- [`iif`](/api/index/function/iif)

### Join Creation Operators

* == emit values -- of -- MULTIPLE source Observables

- [`combineLatest`](/api/index/function/combineLatest)
- [`concat`](/api/index/function/concat)
- [`forkJoin`](/api/index/function/forkJoin)
- [`merge`](/api/index/function/merge)
- [`partition`](/api/index/function/partition)
- [`race`](/api/index/function/race)
- [`zip`](/api/index/function/zip)

### Transformation Operators

- [`buffer`](/api/operators/buffer)
- [`bufferCount`](/api/operators/bufferCount)
- [`bufferTime`](/api/operators/bufferTime)
- [`bufferToggle`](/api/operators/bufferToggle)
- [`bufferWhen`](/api/operators/bufferWhen)
- [`concatMap`](/api/operators/concatMap)
- [`concatMapTo`](/api/operators/concatMapTo)
- [`exhaustMap`](/api/operators/exhaustMap)
- [`expand`](/api/operators/expand)
- [`groupBy`](/api/operators/groupBy)
- [`map`](/api/operators/map)
- [`mapTo`](/api/operators/mapTo)
- [`mergeMap`](/api/operators/mergeMap)
- [`mergeMapTo`](/api/operators/mergeMapTo)
- [`mergeScan`](/api/operators/mergeScan)
- [`pairwise`](/api/operators/pairwise)
- [`partition`](/api/operators/partition)
- [`scan`](/api/operators/scan)
- [`switchScan`](/api/operators/switchScan)
- [`switchMap`](/api/operators/switchMap)
- [`switchMapTo`](/api/operators/switchMapTo)
- [`window`](/api/operators/window)
- [`windowCount`](/api/operators/windowCount)
- [`windowTime`](/api/operators/windowTime)
- [`windowToggle`](/api/operators/windowToggle)
- [`windowWhen`](/api/operators/windowWhen)

### Filtering Operators

- [`audit`](/api/operators/audit)
- [`auditTime`](/api/operators/auditTime)
- [`debounce`](/api/operators/debounce)
- [`debounceTime`](/api/operators/debounceTime)
- [`distinct`](/api/operators/distinct)
- [`distinctUntilChanged`](/api/operators/distinctUntilChanged)
- [`distinctUntilKeyChanged`](/api/operators/distinctUntilKeyChanged)
- [`elementAt`](/api/operators/elementAt)
- [`filter`](/api/operators/filter)
- [`first`](/api/operators/first)
- [`ignoreElements`](/api/operators/ignoreElements)
- [`last`](/api/operators/last)
- [`sample`](/api/operators/sample)
- [`sampleTime`](/api/operators/sampleTime)
- [`single`](/api/operators/single)
- [`skip`](/api/operators/skip)
- [`skipLast`](/api/operators/skipLast)
- [`skipUntil`](/api/operators/skipUntil)
- [`skipWhile`](/api/operators/skipWhile)
- [`take`](/api/operators/take)
- [`takeLast`](/api/operators/takeLast)
- [`takeUntil`](/api/operators/takeUntil)
- [`takeWhile`](/api/operators/takeWhile)
- [`throttle`](/api/operators/throttle)
- [`throttleTime`](/api/operators/throttleTime)

### Join Operators

- [`combineLatestAll`](/api/operators/combineLatestAll)
- [`concatAll`](/api/operators/concatAll)
- [`exhaustAll`](/api/operators/exhaustAll)
- [`mergeAll`](/api/operators/mergeAll)
- [`switchAll`](/api/operators/switchAll)
- [`startWith`](/api/operators/startWith)
- [`withLatestFrom`](/api/operators/withLatestFrom)

### Multicasting Operators

- [`share`](/api/operators/share)

### Error Handling Operators

- [`catchError`](/api/operators/catchError)
- [`retry`](/api/operators/retry)
- [`retryWhen`](/api/operators/retryWhen)

### Utility Operators

- [`tap`](/api/operators/tap)
- [`delay`](/api/operators/delay)
- [`delayWhen`](/api/operators/delayWhen)
- [`dematerialize`](/api/operators/dematerialize)
- [`materialize`](/api/operators/materialize)
- [`observeOn`](/api/operators/observeOn)
- [`subscribeOn`](/api/operators/subscribeOn)
- [`timeInterval`](/api/operators/timeInterval)
- [`timestamp`](/api/operators/timestamp)
- [`timeout`](/api/operators/timeout)
- [`timeoutWith`](/api/operators/timeoutWith)
- [`toArray`](/api/operators/toArray)

### Conditional and Boolean Operators

- [`defaultIfEmpty`](/api/operators/defaultIfEmpty)
- [`every`](/api/operators/every)
- [`find`](/api/operators/find)
- [`findIndex`](/api/operators/findIndex)
- [`isEmpty`](/api/operators/isEmpty)

### Mathematical and Aggregate Operators

- [`count`](/api/operators/count)
- [`max`](/api/operators/max)
- [`min`](/api/operators/min)
- [`reduce`](/api/operators/reduce)

## how to create CUSTOM operators?

### -- via -- `pipe()` function

* `pipe()`
  * ⚠️!= `Observable.pipe()` method⚠️
  * allows
    * creating custom operator / 👀== combination of built-in operators👀
* use case
  * COMMON used sequence of operators | your code
    * == 👀extract the sequence -- into a -- NEW operator👀

### Creating new operators from scratch

* -- via -- function / return Observable /
  * implements
    * ALL 3 observer functions -- `next()`, `error()` & `complete()` --
    * "finalization" function / cleans up | complete the Observable
  * returns the "finalization" function
* allows
  * creating custom operator / -- from -- scratch Observable constructor
