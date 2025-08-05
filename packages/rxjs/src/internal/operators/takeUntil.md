![](/apps/rxjs.dev/src/assets/images/marble-diagrams/takeUntil.png)

* `export function takeUntil<T>(notifier: ObservableInput<any>): MonoTypeOperatorFunction<T> {}`
  * 💡emits the source Observable's values | TILL `notifier` Observable emits a value💡
  * how does it work?
    * about source Observable (== `sourceObservable.pipe(takeUntil(...))`),
      * subscribes
      * begins mirroring
    * about `notifier`,
      * monitors it
      * if it
        * emits a value -> output Observable
          * stops mirroring the source Observable
          * completes
        * does NOT emit a value & completes -> emit ALL source Observable's values
  * `notifier: ObservableInput`
    * if it emits a value -> output Observable stops emitting source Observable's values
  * return a function / returns an Observable / emits source Observable's values | TILL `notifier` emits its first value
