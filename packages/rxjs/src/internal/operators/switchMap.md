* EACH source value is projected -- to an -- Observable /
  * merged | output Observable
    * == flattens ALL inner Observables -- via -- `switchAll`
  * emit values
    * ⚠️ONLY -- from -- the MOST OUTER projected Observable⚠️
    * -- based on the -- function / you supply

![](/apps/rxjs.dev/src/assets/images/marble-diagrams/switchMap.png)

* `export function switchMap<T, O extends ObservableInput<any>>(project: (value: T, index: number) => O): OperatorFunction<T, ObservedValueOf<O>> {}`
