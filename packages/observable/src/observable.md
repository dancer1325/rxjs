* TODO:

* `export class Subscription implements SubscriptionLike {}`
  * == ⭐️disposable resource⭐️
    * _Example:_ observable execution
  * `unsubscribe(): void {}`
    * ⚠️IMPORTANT method⚠️
    * 💡disposes the resource / held -- by the -- subscription💡
      * _Examples:_
        * cancel an ongoing Observable execution
        * cancel any type of work / started | create the `Subscription`
  * `add(teardown: TeardownLogic): void {}`
    * 👀group subscriptions👀 /
      * child subscription is attached | current subscription
      * 👀if subscription unsubscribed -> ALL children are unsubscribed👀
    * `teardown: TeardownLogic`
      * == finalization logic -- to -- add | this subscription
    * TODO: Adds a finalizer to this subscription, so that finalization will be unsubscribed/called
      when this subscription is unsubscribed. If this subscription is already {@link #closed},
      because it has already been unsubscribed, then whatever finalizer is passed to it
      will automatically be executed (unless the finalizer itself is also a closed subscription). Closed Subscriptions cannot be added as finalizers to any subscription. Adding a closed
subscription to a any subscription will result in no operation. (A noop). Adding a subscription to itself, or adding `null` or `undefined` will not perform any
operation at all. (A noop).`Subscription` instances that are added to this instance will automatically remove themselves
if they are unsubscribed. Functions and {@link Unsubscribable} objects that you wish to remove
will need to be removed manually with {@link #remove}

* `export class Subscriber<T> extends Subscription implements Observer<T> {}`
  * allows
    * implementing operators
  * ⚠️rare uses⚠️
    * as public API
  * library's workhorse
    * == 👀library's component / makes the hard work👀
  * `constructor(destination?: Subscriber<T> | Partial<Observer<T>> | ((value: T) => void) | null);`
    * ⚠️deprecated⚠️
      * use `function operate<>()`
  * `constructor(destination?: Subscriber<T> | Partial<Observer<T>> | ((value: T) => void) | null, overrides?: SubscriberOverrides<T>) {}`
    * ⚠️deprecated⚠️
      * use `function operate<>()`
    * if `destination` ==
      * `Subscriber<T>` -> AUTOMATICALLY wire up unsubscription between this instance -- & -- `destination` instance
      * `Partial<Observer<T>> | ((value: T) => void)` -> apply wrapped & appropriate safeguards
    * `((value: T) => void)`
      * == `next()`
        * == `value` == NEXT value
  * TODO:

* TODO:

* `export class Observable<T> implements Subscribable<T> {}`
  * == 💡any set of values | any amount of time💡
  * RxJS's MOST basic building block
  * `constructor(subscribe?: (this: Observable<T>, subscriber: Subscriber<T>) => TeardownLogic) {}`
    * `subscribe`
      * == function /
        * | initially subscribe the Observable, is called
        * 👀passed -- to the -- `Subscriber`👀
  * TODO:

* TODO:

* `export function operate<In, Out>({ destination, ...subscriberOverrides }: OperateConfig<In, Out>) {}`

* TODO:
