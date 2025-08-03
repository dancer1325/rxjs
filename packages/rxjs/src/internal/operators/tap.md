* `export interface TapObserver<T> extends Observer<T> {}`
  * uses
    * 👀ONLY by `tap` operator👀
  * provides
    * 👀ADDITIONAL callbacks👀
      * != common `Observer` callbacks
  * `subscribe: () => void;`
    * callback /
      * | source Observable gets subscribed to, `tap` operator invokes
  * `unsubscribe: () => void;`
    * callback /
      * | unsubscribe events, `tap` operator invokes it
  * `finalize: () => void;`
    * callback /
      * | finalization happens, `tap` operator invokes it
    * == `finalize` operator


* `export function tap<T>(observerOrNext?: Partial<TapObserver<T>> | ((value: T) => void) | null): MonoTypeOperatorFunction<T> {`
  * 's goal
    * ⭐️enable perform side effects⭐️
      * side-effects == outside state with + NO alter the notification

  ![](/apps/rxjs.dev/src/assets/images/marble-diagrams/tap.png)

  * vs `map` OR `mergeMap`
    * ALSO enable perform side-effects
    * recommendation
      * use `tap`
        * Reason: 🧠`tap`'s design is to perform side-effects🧠
  * if there's a notification (`next`, `error`, or `complete`) -> `tap` call -- , via reference OR particular observer, the -- appropriate callback
    * AFTERWARD, notification is passed down the stream
  * returned observable
    * == 👀exact source's mirror👀
      * EXCEPT TO
        * if error happens synchronously | `tap`'s handler -> emitted -- as -- returned observable's error
  * you can mutate objects
    * Reason:🧠they pass -- through the -- `tap` operator's handlers🧠
  * use cases
    * debugging
      ```ts
      // | anywhere
      tap(console.log)      // console.log    == CURRENT value
      ```
  * returns an `Observable` == source
  * runs the specified Observer or callback(s) / EACH item

