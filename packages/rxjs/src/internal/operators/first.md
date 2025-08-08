* allows
  * emits ONLY the source Observable's
    * FIRST value OR
    * FIRST value / meets some condition

* ONCE observable's value is emitted -> complete

![](/apps/rxjs.dev/src/assets/images/marble-diagrams/first.png)


* `export function first<T, D>(
  predicate?: ((value: T, index: number, source: Observable<T>) => boolean) | null,
  defaultValue?: D
): OperatorFunction<T, T | D> {}`
  * 's input
    * `predicate?: ((value: T, index: number, source: Observable<T>) => boolean) | null`
      * == function /
        * evaluate EACH value
        * `value: T`
          * == value / CURRENTLY emitted by the Observable
    * `defaultValue?: D`
      * == default value /
        * if NO valid value was found | source -> emitted
  * 's return
    * 💡function / returns an Observable / emits the FIRST item / matches the condition (== predicate)💡
    * ⚠️if `defaultValue` is NOT provided & matching element is NOT found -> emits an error notification (`EmptyError`)⚠️
      * if the Observable completes BEFORE any `next` notification was sent -> delivers to the Observer's `error` callback
        * != `take(1)`
