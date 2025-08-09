* `export class Subject<T> extends Observable<T> implements SubscriptionLike {}`
  * see [documentation](/apps/rxjs.dev/content/guide/subject.md)
  * `_closed`
    * := subject / closed & NO longer accept NEW values
  * `private observerSnapshot: Observer<T>[] | undefined;`
    * uses
      * track `Observer<T>[]`
    * allows
      * | iterate them, we do NOT have to clone them
  * TODO:
  * `next(value: T) {}`
    * ⚠️if it's unsubscribed -> throws an error⚠️
  * TODO:
  * `unsubscribe() {}`
  * TODO:
  * `asObservable(): Observable<T> {}`
    * 👀creates a NEW Observable / this Subject == source Observable👀
    * uses
      * create Subject's custom Observer-side logic
      * 💡hide Subject's functionality & expose ONLY Observable's functionality💡
