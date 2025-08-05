* TODO:
* `function of<T>(...values: T[]): Observable<T> {}`
  * `...values`
    * == `value1, value2, value3, ....`
    * == values / you want to emit
    * -- are converted to an -- observable sequence
    * EACH one -- becomes a -- `next` notification

    ![](/apps/rxjs.dev/src/assets/images/marble-diagrams/of.png)
      * != `.from(arguments)`
        * ALL -- are sent as a -- whole
  * `Observable<T>`
    * == observable /
      * sync emit the `values`
      * | ONCE ALL have been emitted,
        * IMMEDIATELY completes
