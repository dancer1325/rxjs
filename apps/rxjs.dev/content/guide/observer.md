# Observer

* Observer
  * == 👀consumer of values -- delivered by an -- `Observable`👀
  * == 💡set of callbacks💡 /
    * 👀1 / EACH type of notification -- delivered by the -- Observable (`next`, `error` & `complete`)👀
      * partial
        * == NOT provide ALL callbacks
        * == ignore some types of notifications
        * execution of the Observable STILL happen NORMALLY
  * steps to use
    * provide it -- to -- `observable.subscribe(observer)`
  * 👀ways to create 👀
    * create an object / set of callbacks (`next`, `error` & `complete`)
    * directly | `observable.subscribe(callBackFunction)`
      * 💡`callBackFunction`  == `next` call back function💡
