# RxJS Core Semantics

* | RxJS v8,
  * ALL operators / provided | core library,
    * ⚠️MUST meet the following semantics⚠️
* | RxJS v7,
  * ALL operators
    * ⚠️SHOULD meet the following semantics⚠️

* goal
  * provide
    * predictable behavior for the users of our library
  * ensure
    * consistent behavior BETWEEN OUR DIFFERENT operators

## General Design Guidelines

* functions / > 1 argument & AFTER FIRST time, arguments are NON-obvious
  * -> use 👀named parameters in-cases👀
    * Reason:🧠primary use case should work streamline + WITHOUT configuration
    * _Example:_
      * `fakeFlattenMap(n => of(n))` == fine
      * if there are > 1 argument
        * `fakeFlattenMap(n => of(n), 1)` -- hard to read
        * `fakeFlattenMap(n => of(n), { maxConcurrent: 1 })` -- easier to read
  * _Example of functions:_ operators, constructors & creation functions

## Operators

* == function /
  * returns an [`OperatorFunction`](https://rxjs.dev/api/index/interface/OperatorFunction)
    * == `(source: Observable<In>) => Observable<Out>`
      * returned observable MUST subscribe | source observable
    * `OperatorFunction` MUST be [referentially transparent](https://en.wikipedia.org/wiki/Referential_transparency)
      * == 👀if the operator does NOT change anything -> MUST return the SAME observable's reference👀
  * 's inputs
    * ⚠️if it's == `ObservableInput` (== "notifier") -> MUST ONLY recognize `next` "notifications"⚠️
      * -> ⚠️keep on emitting source observable's values⚠️
- TODO: "Notifiers" provided directly to the operator MUST be subscribed to _before_ the source is subscribed to
- "Notifiers" created via factory function provided to the operator SHOULD be subscribed to at the earliest possible moment.
- The observable returned by the operator function is considered to be the "consumer" of the source
- As such, the consumer MUST unsubscribe from the source as soon as it knows it no longer needs values before proceeding to do _any_ action.
- Events that happen after the completion of a source SHOULD happen after the source finalizes
- This is to ensure that finalization always happens in a predictable time frame relative to the event.
- `Error` objects MUST NOT be retained longer than necessary. This is a possible source of memory pressure.
- `Promise` references MUST NOT be retained longer than necessary. This is a possible source of memory pressure.
- IF they perform a related operation to a creation function, they SHOULD share the creation function's name only with the suffix `With`. (e.g. `concat` and `concatWith`).
- SHOULD NOT have "result selectors"
- This is a secondary argument that provides the ability to "map" values after performing the primary operation of the operator.

## Creation Functions

- names
  - ❌MUST NOT end in `With`❌
    - Reason:🧠reserved for the operator counter parts of creation functions🧠
- MAY have "result selectors"
  - == secondary argument /
    - BEFORE emitting -- from the -- resulting observable,
      - enables you -- to -- "map" values
- if it accepts a "result selector" ->
  - ❌must NOT accept "n-arguments" -- ahead of -- that result selector❌

    ```
    combineThings(sourceA$, sourceB$, (a, b) => a + b)
    ```

  - FIRST argument: array OR object + SECOND argument: result selector

    ```
    combineThings([sourceA$, sourceB$], (a, b) => a + b)
    ```
