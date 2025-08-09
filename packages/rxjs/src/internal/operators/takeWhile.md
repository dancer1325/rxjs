* allows
  * emit values / emitted by the source Observable / satisfies the `predicate`
    * ⚠️ONCE SOME value does NOT satisfy -> complete⚠️

![](/apps/rxjs.dev/src/assets/images/marble-diagrams/takeWhile.png)

* `export function takeWhile<T>(predicate: (value: T, index: number) => boolean, inclusive = false): MonoTypeOperatorFunction<T> {}`
  * 's input
    * `predicate`
      * == function /
        * evaluates `value`
          * 👀`value` == emitted -- by the -- source Observable👀
        * returns a boolean
    * `inclusive`
      * 👀if `true` -> value / caused `predicate` returns `false` ALSO emitted👀
  * 's return
    * == function / returns an Observable / emit source Observable's values /
      * satisfy predicate
      * | ALL ALREADY emitted,
        * complete
