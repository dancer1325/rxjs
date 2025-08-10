![](/apps/rxjs.dev/src/assets/images/marble-diagrams/interval.png)

* `export function interval(period = 0, scheduler: SchedulerLike = asyncScheduler): Observable<number> {}`
  * 's input
    * `period = 0`
      * == interval size /
        * BETWEEN EACH emitted item
        * 's units
          * by default, milliseconds, OR
          * -- determined by the -- `scheduler`'s clock
    * `scheduler: SchedulerLike`
      * uses
        * schedule the emission of values
        * provide "time"'s units
  * 's return
    * 👀Observable / emits an INFINITIVE sequential (0, 1, 2, ...) number /
      * EACH time interval👀
      * FIRST item is emitted | AFTER `period`
