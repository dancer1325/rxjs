* TODO:

* `export interface UnaryFunction<T, R> {
  (source: T): R;
  }`
  * == function /
    * accepts 1 parameter (`T`)
    * returns 1 parameter (`R`)
  * uses
    * 👀describe `OperatorFunction`👀

* `export interface OperatorFunction<T, R> extends UnaryFunction<Observable<T>, Observable<R>> {}`
  * == function /
    * accepts 1 Observable (`T`)
    * returns 1 Observable (`R`)

* TODO:

* `export interface MonoTypeOperatorFunction<T> extends OperatorFunction<T, T> {}`
  * == function type interface /
    * == function /
      * input parameter's type == returned argument's type
  * uses
    * describe `OperatorFunction`

* TODO:

* `export type ObservableInput<T>`
  * == ALLOWED types /
    * 👀can be converted -- to -- observables👀

* TODO:
