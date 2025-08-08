* `combineLatest(any)`
  * 's argument === `any`
    * -> | build-time, we do NOT know the tye

* `export function combineLatest<T extends AnyCatcher>(arg: T): Observable<unknown>;`
  * 's argument == `any` -> can NOT figure out if it is an `[]` OR object -> `unknown`
    * recommendation
      * MORE specific tye

* `export function combineLatest<O extends ObservableInput<any>, R>(
  sources: Record<string, O> | O[],
  resultSelector?: (...value: any[]) => R
): Observable<R> | Observable<ObservedValueOf<O>[]> {}`
  * allows
    * 💡creating, FROM MULTIPLE Observables -- 1 Observable💡 /
      * 's values
        * 👀-- calculated from -- input Observables' latest values👀
        * 👀emitted |
          * ⚠️ALL input Observable have ALREADY emitted 1 value⚠️
          * ANY input Observable emits a value👀
            * requirements
              * ⚠️subscribe | EACH input Observable in order⚠️
  * 's arguments
    * `sources: Record<string, O> | O[]`
      * `ObservableInput`S  /
        * provided -- as an -- array OR object
        * are combined ALL
      * `O[]`
        * use case
          * BEFOREHAND, you do NOT know the number of Observables
        * if you pass empty observable -> `combineLatest(emptyObservable)` completes IMMEDIATELY
    * `resultSelector?: (...value: any[]) => R`
      * uses
        * combined latest values are projected | output Observable's new value
  * 's return
    * `Observable<R> | Observable<ObservedValueOf<O>[]> {}`
      * `Observable<R>`
        * == Observable of projected values -- from -- EACH `ObservableInput`'s MOST recent values
      * `Observable<ObservedValueOf<O>[]> {}`
        * == Observable of [] of ALL `ObservableInput`'s MOST recent values
        * 👀if you pass `n` Observables as argument -> returned Observable emit an array of `n` values👀 ⚠️in order⚠️
          * Reason:🧠that's why output Observable waits for ALL input Observables have emitted >= 1 value🧠
          * ️in order == order of the passed Observables
            * Reason:🧠pick last value / emitted by ANY input Observable🧠
            * _Example:_ first Observable's value == array's index 0

![](/apps/rxjs.dev/src/assets/images/marble-diagrams/combineLatest.png)

* TODO:
* Also, if some input Observable does not emit any value and never completes, `combineLatest` will also never emit
* and never complete, since, again, it will wait for all streams to emit some
* value.
*
* If at least one Observable was passed to `combineLatest` and all passed Observables
* emitted something, the resulting Observable will complete when all combined
* streams complete. So even if some Observable completes, the result of
* `combineLatest` will still emit values when other Observables do. In case
* of a completed Observable, its value from now on will always be the last
* emitted value. On the other hand, if any Observable errors, `combineLatest`
* will error immediately as well, and all other Observables will be unsubscribed.

