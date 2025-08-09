* allows
  * emits ONLY the source Observable's / satisfy a predicate
    * FIRST value OR
    * FIRST value / meets some condition

* == [Array.prototype.filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)

* `export function filter<T, S extends T, A>(predicate: (this: A, value: T, index: number) => value is S, thisArg: A): OperatorFunction<T, S>;`
  * ⚠️deprecated⚠️
  * | v8,
    * ⚠️removed⚠️
  * `thisArg: A`
    * should be replaced -- by a -- closure

* `export function filter<T, A>(predicate: (this: A, value: T, index: number) => boolean, thisArg: A): MonoTypeOperatorFunction<T>;`
  * ⚠️deprecated⚠️
  * | v8,
    * ⚠️removed⚠️
  * `thisArg: A`
    * should be replaced -- by a -- closure

![](/apps/rxjs.dev/src/assets/images/marble-diagrams/filter.png)

* `export function filter<T>(predicate: (value: T, index: number) => boolean, thisArg?: any): MonoTypeOperatorFunction<T> {}`
  * 's input
    * `predicate: (value: T, index: number) => boolean`
      * == function /
        * evaluate EACH value
        * `value: T`
          * == value / CURRENTLY emitted by the Observable
        * `index: number`
          * i-th source emission / happened | since subscription
          * == `[0,)`
        * if it returns
          * `true` -> value is emitted
          * `false` -> value is NOT passed | output Observable
    * `thisArg?: any`
      * allows
        * determining `this`'s value | `predicate`
  * 's return
    * 💡function / returns an Observable / emits Observable's items / match the condition (== predicate)💡
