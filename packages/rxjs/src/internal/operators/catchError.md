* `export function catchError<T, O extends ObservableInput<any>>(
  selector: (err: any, caught: Observable<T>) => O
): OperatorFunction<T, T | ObservedValueOf<O>>;`

* `export function catchError<T, O extends ObservableInput<any>>(
  selector: (err: any, caught: Observable<T>) => O
): OperatorFunction<T, T | ObservedValueOf<O>> {}`
  * allows
    * catching errors | observable /
      * ONLY listens | error channel
      * ⚠️ignores notifications⚠️
        * == != subscribe
    * returning a NEW observable OR throwing an error
  * 💡if you subscribe | source observable -> subscribed | NEW observable💡
  * `selector`
    * == function /
      * 's arguments
        * `err` == error
        * `caught` == source observable
          * 💡if you return it == "retry"💡
      * returns an observable
        * used | observable chain
  * 👀return a function / returns an Observable / originates -- from --👀
    * source OR
    * Observable / returned -- by the -- `selector` function

 ![](/apps/rxjs.dev/src/assets/images/marble-diagrams/catch.png)
