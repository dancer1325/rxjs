![](/apps/rxjs.dev/src/assets/images/marble-diagrams/empty.png)

* `export const EMPTY = new Observable<never>((subscriber) => subscriber.complete());`
  * == Observable /
    * ❌NO emits items -- to the -- Observer❌
      * == 👀IMMEDIATELY emits a complete notification👀
      * == ONLY emits 'complete' notification
  * uses
    * 👀compose with OTHER Observables👀 /
      * ❌NO interfere -- with -- OTHER Observables❌
      * used -- as -- fallback
