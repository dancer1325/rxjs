![](/apps/rxjs.dev/src/assets/images/marble-diagrams/take.png)

* `export function take<T>(count: number): MonoTypeOperatorFunction<T> {}`
  * 's input
    * `count: number`
      * MAXIMUM number of `next` values / emit
  * 's return
    * function / returns an Observable / emits
      * ONLY the FIRST `count` values / emitted by the source Observable, OR
      * if the source emits < `count` values -> ALL values from the source
