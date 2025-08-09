* allows
  * creating an observable /
    * 👀wait for specified time period OR exact date, to emit the number 0👀

* uses
  * create delays (|milliseconds) | code
  * race against other values -- for -- ad-hoc timeouts
  * delay the subscription | observable

* TODO: The {@link asyncScheduler} uses `setTimeout` which has limitations for how far in the future it can be scheduled.
 * If a `scheduler` is provided that returns a timestamp other than an epoch from `now()`, and
 * a `Date` object is passed to the `dueTime` argument, the calculation for when the first emission
 * should occur will be incorrect
 * In this case, it would be best to do your own calculations ahead of time, and pass a `number` in as the `dueTime`.

* `export function timer(due: number | Date, scheduler?: SchedulerLike): Observable<0>;`
  * 's input
    * `due:`
      * `number`
        * time | milliseconds -- to wait -- BEFORE emitting
      * `Date`
        * exact time -- to -- emit
    * `scheduler?: SchedulerLike`
      * schedule the delay
        * by default, `asyncScheduler`



 *
 * ### Known Limitations
 *
 * - The {@link asyncScheduler} uses `setTimeout` which has limitations for how far in the future it can be scheduled.
 *
 * - If a `scheduler` is provided that returns a timestamp other than an epoch from `now()`, and
 * a `Date` object is passed to the `dueTime` argument, the calculation for when the first emission
 * should occur will be incorrect. In this case, it would be best to do your own calculations
 * ahead of time, and pass a `number` in as the `startDue`.
 * @param startDue If a `number`, is the time to wait before starting the interval.
 * If a `Date`, is the exact time at which to start the interval.

* `export function timer(startDue: number | Date, intervalDuration: number, scheduler?: SchedulerLike): Observable<number>;`
  * `intervalDuration: number`
    * by default, milliseconds
    * 👀delay between values / emitted | interval👀
    * if you pass a negative number -> AFTER emitting the FIRST value, IMMEDIATE completion

* `export function timer(dueTime: number | Date, unused: undefined, scheduler?: SchedulerLike): Observable<0>;`
  * ⚠️deprecated⚠️
  * | v8,
    * removed
    * use `timer(dueTime, scheduler?)`

* `export function timer(
  dueTime: number | Date = 0,
  intervalOrScheduler?: number | SchedulerLike,
  scheduler: SchedulerLike = asyncScheduler
): Observable<number> {}`
