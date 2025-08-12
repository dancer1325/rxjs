* `export class BehaviorSubject<T> extends Subject<T> {}`
  * == Subject's variant /
    * requirements
      * ⚠️initial value⚠️
    * | subscribes to it, emits its ⚠️CURRENT value⚠️
  * `constructor(private _value: T) {}`
