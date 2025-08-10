* allows
  * 💡re-emits ALL SAME source Observable's notifications / specified scheduler💡
    * ⚠️!= replace source Observables internal scheduler⚠️
* ensure
  * specific scheduler is used | outside an Observable
* use cases
 * you do NOT control Observable's internal scheduler & want to control when to emit its values

* `export function observeOn<T>(scheduler: SchedulerLike, delay = 0): MonoTypeOperatorFunction<T> {}`
  * 's inputs
    * `scheduler`
      * uses
        * 💡reschedule notifications -- from -- source Observable💡
    * `delay`
      * milliseconds
      * == delay -- to -- reschedule EVERY notification
      * recommendations
        * 👀use it👀
  * 's return
    * function / returns an Observable / emits notifications /
      * notifications == source Observable's notifications + provided scheduler
  * vs [`delay()`](delay.ts)
    * `observeOn()`
      * delay ALL notifications (ALSO `error` notifications)
    * `delay()`
      * will pass through error from source Observable immediately when it is emitted
