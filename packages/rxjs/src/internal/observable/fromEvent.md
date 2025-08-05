* TODO:

* `export function fromEvent<T>(
  target: any,
  eventName: string | symbol,
  options?: EventListenerOptions | ((...args: any[]) => T),
  resultSelector?: (...args: any[]) => T
  ): Observable<T> {`
  * ⭐️creates an Observable / emits events -- from -- `target` | `eventName`⭐️
    * `eventName`
      * == event / we want to listen to
      * ⚠️-- depend on -- target⚠️
    * `target`
      * == object / 's methods register event handler functions
      * ⚠️ALLOWED ones⚠️
        * are
          * DOM `EventTarget`
            * built-in methods
              * `addEventListener`
              * `removeEventListener`
          * Node.js EventEmitter events
            * == object / built-in methods
              * `addListener`
              * `removeListener`
          * JQuery-style event target
            * == object / built-in methods
              * `on`
              * `off`
          * DOM `NodeList`
            * == list of DOM `Nodes`
              * uses
                * returned by
                  * `document.querySelectorAll`
                  * `Node.childNodes`
              * install event handler function / EACH node
            * ❌NOT event target in itself❌
            * | unsubscribe returned Observable -> event handler function is removed | ALL Nodes
          * DOM `HtmlCollection`
            * == collection of DOM nodes
              * install & remove event handler function / EACH element
        * 👀if you want FROM another target -> use `fromEventPattern`👀
          * Reason:🧠it can be used | ARBITRARY APIs🧠
        * checked -- via -- duck typing
          * == you can safely use it
          * ALTHOUGH Node.js library exposes event target / 's method name == DOM EventTarget's method name -> NOT problem
      * ❌if event target calls registered function / >1 argument -> != FIRST arguments will NOT appear | resulting stream❌
        * if you want to get access to NON FIRST arguments -> pass to `fromEvent` optional project function
          * it's called with ALL arguments / passed -- to -- event handler
          * == Output Observable emit value / returned by project function
            * != usual value
  * `options?: EventListenerOptions | ((...args: any[]) => T)`
    * == `eventName`'s arguments
  * `resultSelector?: (...args: any[]) => T`
    * == mapping function /
      * transform events
      * `args` == event handler's arguments

  ![](/apps/rxjs.dev/src/assets/images/marble-diagrams/fromEvent.png)


* if the API you use is MORE callback ->
  * event handler oriented
    * ==subscribed callback function fires only once and thus there is no need to manually unregister it
  * use `bindCallback` OR `bindNodeCallback`

* TODO:
