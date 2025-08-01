* TODO:

* `export interface Observer<T> {}`
  * == public API /
    * 💡consume the `Observable`'s values💡
  * 👀ALL `Observer`s get converted -- to a -- `Subscriber`👀
    * Reason:🧠provide Subscription-like capabilities (_Example:_ `unsubscribe`) 🧠
  * == callback functions /
    * allows
      * getting notified -- of -- any set of `Observable`
    * `next: (value: T) => void;`
      * TODO:
    * `error: (err: any) => void;`
      * TODO:
    * `complete: () => void;`
      * TODO:

* TODO:
