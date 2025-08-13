* `export class ReplaySubject<T> extends Subject<T> {}`
  * == `Subject`'s variant /
    * 💡| NEW subscribers, "replays" old values💡
      * == | subscribe, emit synchronously old values -- via -- FIFO manner
      * -> store a specified number of values
    * vs `BehaviorSubject`
      * | constructor,
        * ❌NOT has initial value❌
      * ⚠️ALTHOUGH emit an error -> keep on replaying PREVIOUS emitted values⚠️
  * `constructor(
    private _bufferSize: (T | number)[] = Infinity,
    private _windowTime = Infinity,
    private _timestampProvider: TimestampProvider = dateTimestampProvider
    ) {`
    * 's input
      * `_bufferSize`
        * == buffer's size / | subscription, replay
          * == items / stored | buffer
      * `_windowTime`
        * == amount of time / buffered items will STAY buffered
          * == values / OUTSIDE this window, removed
      * `_timestampProvider`
        * uses
          * calculate the amount of time / something has been buffered
