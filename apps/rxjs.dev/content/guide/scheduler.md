# Scheduler

* scheduler
  * == 👀data structure + execution context + (virtual) clock 👀
    * data structure
      * uses
        * how to ,-- based on -- priority or other criteria,
          * store tasks
          * queue tasks
    * execution context
      * uses
        * specify where & when executing the task
          * _Example:_
            * immediately,
            * another callback mechanism -- `setTimeout` or `process.nextTick`
    * (virtual) clock
      * provides
        * `.now()`
          * == 👀notion of "time"👀
          * uses
            * if tasks are scheduled | particular scheduler -> ⚠️adhere ONLY | this clock's time⚠️
          * use cases
            * testing
  * 👀controls when 👀
    * start the subscription
    * to delivery the notifications

* TODO:
In the example below, we take the usual simple Observable that emits values `1`, `2`, `3` synchronously,
and use the operator `observeOn` to specify the `asyncScheduler` scheduler to use for delivering those values.

Notice how the notifications `got value...` were delivered after `just after subscribe`, which is different to the default behavior we have seen so far
This is because `observeOn(asyncScheduler)` introduces a proxy Observer between `new Observable` and the final Observer
Let's rename some identifiers to make that distinction obvious in the example code:

<!-- prettier-ignore -->
```ts
import { Observable, observeOn, asyncScheduler } from 'rxjs';

const observable = new Observable((proxyObserver) => {
  proxyObserver.next(1);
  proxyObserver.next(2);
  proxyObserver.next(3);
  proxyObserver.complete();
}).pipe(
  observeOn(asyncScheduler)
);

const finalObserver = {
  next(x) {
    console.log('got value ' + x);
  },
  error(err) {
    console.error('something wrong occurred: ' + err);
  },
  complete() {
    console.log('done');
  },
};

console.log('just before subscribe');
observable.subscribe(finalObserver);
console.log('just after subscribe');
```

The `proxyObserver` is created in `observeOn(asyncScheduler)`, and its `next(val)` function is approximately the following:

<!-- prettier-ignore -->
```ts
const proxyObserver = {
  next(val) {
    asyncScheduler.schedule(
      (x) => finalObserver.next(x),
      0 /* delay */,
      val /* will be the x for the function above */
    );
  },

  // ...
};
```

The `asyncScheduler` Scheduler operates with a `setTimeout` or `setInterval`, even if the given `delay` was zero. As usual, in JavaScript, `setTimeout(fn, 0)` is known to run the function `fn` earliest on the next event loop iteration. This explains why `got value 1` is delivered to the `finalObserver` after `just after subscribe` happened.

The `schedule()` method of a Scheduler takes a `delay` argument, which refers to a quantity of time relative to the Scheduler's own internal clock. A Scheduler's clock need not have any relation to the actual wall-clock time. This is how temporal operators like `delay` operate not on actual time, but on time dictated by the Scheduler's clock. This is specially useful in testing, where a _virtual time Scheduler_ may be used to fake wall-clock time while in reality executing scheduled tasks synchronously.

## Scheduler Types

The `asyncScheduler` Scheduler is one of the built-in schedulers provided by RxJS. Each of these can be created and returned by using static properties of the `Scheduler` object.

| Scheduler                 | Purpose                                                                                                                                                                        |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `null`                    | By not passing any scheduler, notifications are delivered synchronously and recursively. Use this for constant-time operations or tail recursive operations.                   |
| `queueScheduler`          | Schedules on a queue in the current event frame (trampoline scheduler). Use this for iteration operations.                                                                     |
| `asapScheduler`           | Schedules on the micro task queue, which is the same queue used for promises. Basically after the current job, but before the next job. Use this for asynchronous conversions. |
| `asyncScheduler`          | Schedules work with `setInterval`. Use this for time-based operations.                                                                                                         |
| `animationFrameScheduler` | Schedules task that will happen just before next browser content repaint. Can be used to create smooth browser animations.                                                     |

## Using Schedulers

You may have already used schedulers in your RxJS code without explicitly stating the type of schedulers to be used. This is because all Observable operators that deal with concurrency have optional schedulers. If you do not provide the scheduler, RxJS will pick a default scheduler by using the principle of least concurrency. This means that the scheduler which introduces the least amount of concurrency that satisfies the needs of the operator is chosen. For example, for operators returning an observable with a finite and small number of messages, RxJS uses no Scheduler, i.e. `null` or `undefined`. For operators returning a potentially large or infinite number of messages, `queueScheduler` Scheduler is used. For operators which use timers, `asyncScheduler` is used.

Because RxJS uses the least concurrency scheduler, you can pick a different scheduler if you want to introduce concurrency for performance purpose. To specify a particular scheduler, you can use those operator methods that take a scheduler, e.g., `from([10, 20, 30], asyncScheduler)`.

**Static creation operators usually take a Scheduler as argument.** For instance, `from(array, scheduler)` lets you specify the Scheduler to use when delivering each notification converted from the `array`. It is usually the last argument to the operator. The following static creation operators take a Scheduler argument:

- `bindCallback`
- `bindNodeCallback`
- `combineLatest`
- `concat`
- `empty`
- `from`
- `fromPromise`
- `interval`
- `merge`
- `of`
- `range`
- `throw`
- `timer`

**Use `subscribeOn` to schedule in what context will the `subscribe()` call happen.** By default, a `subscribe()` call on an Observable will happen synchronously and immediately. However, you may delay or schedule the actual subscription to happen on a given Scheduler, using the instance operator `subscribeOn(scheduler)`, where `scheduler` is an argument you provide.

**Use `observeOn` to schedule in what context will notifications be delivered.** As we saw in the examples above, instance operator `observeOn(scheduler)` introduces a mediator Observer between the source Observable and the destination Observer, where the mediator schedules calls to the destination Observer using your given `scheduler`.

**Instance operators may take a Scheduler as argument.**

Time-related operators like `bufferTime`, `debounceTime`, `delay`, `auditTime`, `sampleTime`, `throttleTime`, `timeInterval`, `timeout`, `timeoutWith`, `windowTime` all take a Scheduler as the last argument, and otherwise operate by default on the `asyncScheduler`.

Other instance operators that take a Scheduler as argument: `combineLatest`, `concat`, `expand`, `merge`, `startWith`.
