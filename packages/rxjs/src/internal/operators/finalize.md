* `export function finalize<T>(callback: () => void): MonoTypeOperatorFunction<T> {}`
  * 's input
    * `callback: () => void`
      * function / 👀called | terminate (== complete OR error) source Observable👀
  * 's return
    * `MonoTypeOperatorFunction<T>`
      * == function /
        * returns an Observable / mirrors the source Observable
        * call `callback` | termination
