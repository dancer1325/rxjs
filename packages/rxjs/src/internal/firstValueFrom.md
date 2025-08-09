* `export interface FirstValueFromConfig<T> {
  defaultValue: T;
  }`

* `export function firstValueFrom<T, D>(source: Observable<T>, config?: FirstValueFromConfig<D>): Promise<T | D> {}`
  * allows
    * 👀converting an observable -- to a -- promise👀
      * -- by --
        * subscribing | observable
        * returning a promise /
          * arrive values | observable,
            * resolve == subscription closed
  * 's input
    * `source: Observable<T>`
      * observable -- to be converted to a -- promise
    * `config?: FirstValueFromConfig<D>`
      * uses
        * `source` completes WITHOUT emitting a value
  * 's return
    * `Promise`
      * if `source` emits an error -> promise rejects -- with that -- error's message
  * uses
    * 👀observables / in advance you know emit >=1 value OR complete👀
      * Reason:🧠
        * ⚠️if the source observable does NOT emit 1 value OR complete -> promise is hung up == hang out memory⚠️
        * use `timeout`, `take`, `takeWhile`, or `takeUntil`🧠
