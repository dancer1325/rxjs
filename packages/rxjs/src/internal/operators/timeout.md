* `export interface TimeoutConfig<T, O extends ObservableInput<unknown> = ObservableInput<T>, M = unknown> {}`
  * `each?: number;`
    * 👀MAXIMUM time BETWEEN EACH pushed value -- from the -- source👀
      * if it's exceeded -> timeout
      * if `first` is NOT provided -> ALSO apply | first value
      * == timeout conditions
  * `first?: number | Date;`
    * MAXIMUM relative time / first value arrive -- from the -- source
      * if it's exceeded -> timeout
      * units
        * `number` == milliseconds
        * `Date` object
      * == timeout conditions
  * `scheduler?: SchedulerLike;`
    * == scheduler
      * uses
        * \| time-related operations
    * by default, `asyncScheduler`
  * `with?: (info: TimeoutInfo<T, M>) => O;`
    * == factory
      * uses
        * create observable / switch | occurs timeout
      * 's input
        * `info: TimeoutInfo<T, M>`
          * ==
            * source observable's emissions
            * delay or exact time | triggered the timeout
    * if it's provided & source does NOT push values | specified time parameters -> return an observable / switch to a DIFFERENT observable
  * `meta?: M;`
    * == additional metadata /
      * provided -- through the -- `TimeoutError`
    * uses
      * | code / handles the timeout
      * help identify the source -- of a -- timeout

* `export interface TimeoutInfo<T, M = unknown> {}`
  * `readonly meta: M;`
    * == metadata /
      * was provided | timeout configuration
  * `readonly seen: number;`
    * == number of messages / seen BEFORE the timeout
  * `readonly lastValue: T | null;`
    * = LAST message seen

* `export class TimeoutError<T, M> extends Error {}`
  * error -- thrown by the -- `timeout()`
  * uses
    * -- as a -- type
    * do quality comparisons
  * recommendations
    * NOT subclass this
    * create instances of this class DIRECTLY
    * if you need an error / represent a timeout -> create your own error class
    * ways to handle
      * `.catchError(error){ if(error instanceof TimeoutError){}}`
        * Reason of if:🧠validate the error comes -- from -- `timeout`🧠
      * `.tap()`
      * `.subscribe({error: () => {}})`
  * use cases
    * if you do NOT provide a `with` property & timeout conditions are met -> emit a `TimeoutError`

* `export function timeout<T, O extends ObservableInput<unknown>, M = unknown>(
  config: TimeoutConfig<T, O, M> & { with: (info: TimeoutInfo<T, M>) => O }
): OperatorFunction<T, T | ObservedValueOf<O>>;`

* `export function timeout<T, M = unknown>(config: Omit<TimeoutConfig<T, any, M>, 'with'>): OperatorFunction<T, T>;`
  * 's input
    * if timeout conditions are met
      * & you do NOT provide a `with` property &  -> this operator will emit a `TimeoutError`
      * -> use the factory function -- provided by -- `with`
  * 's return
    * observable / if the source does NOT push values | specified time parameters -> will error or switch | DIFFERENT observable
  * use cases
    * MOST flexible option

* `export function timeout<T>(first: Date, scheduler?: SchedulerLike): MonoTypeOperatorFunction<T>;`
  * 's input
    * `first: Date`
      * == date |,
        * if the source observable does NOT emit >=1 value -> resulting observable will timeout
    * `scheduler?: SchedulerLike`
      * == scheduler -- to -- use
      * by default, `asyncScheduler`

* `export function timeout<T>(each: number, scheduler?: SchedulerLike): MonoTypeOperatorFunction<T>;`
  * 's input
    * `each: number`
      * MAXIMUM time BETWEEN EACH pushed value -- from the -- source
        * if it's exceeded -> timeout
      * 's unit
        * == milliseconds
    * `scheduler?: SchedulerLike`
      * == scheduler -- to -- use
      * by default, `asyncScheduler`
  * 's return
    * observable / if the source does NOT push a value | specified time (`each`) in milliseconds -> error

* `export function timeout<T, O extends ObservableInput<any>, M>(
  config: number | Date | TimeoutConfig<T, O, M>,
  schedulerArg?: SchedulerLike
): OperatorFunction<T, T | ObservedValueOf<O>> {}`
  * 's return
      * function / returns an Observable /
        * mirrors source Observable's behaviour
        * if | timeout, Observable does NOT emit -> throws an error

* `function timeoutErrorFactory(info: TimeoutInfo<any>): Observable<never> {}`
  * uses
    * by default, if timeout occurs & `with()` function is NOT specified -> emit an error

![](/apps/rxjs.dev/src/assets/images/marble-diagrams/timeout.png)
