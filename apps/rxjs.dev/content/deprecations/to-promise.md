# Conversion to Promises

* Observables vs Promises
  * SIMILITUDE
    * [collections](../guide/observable) / may produce values | time
  * ⚠️DIFFERENCE ⚠️
    * NUMBER of values / produced
      * Observables may produce >= 0 values
      * Promises may produce 1! value | resolve successfully

## Problem

* [Observable's `toPromise()`](/api/index/class/Observable#toPromise)
  * | RxJS 7,
    * 's return type `Promise<T>` -- to -> `Promise<T | undefined>`
      * ⚠️deprecated⚠️
        * Reason: 🧠Observables can yield 0 values / NO indicated the emmited value🧠
      * ⚠️breaking change⚠️
  * | RxJS 8,
    * ⚠️removed⚠️

## recommendations

* 💡use `firstValueFrom()` OR `lastValueFrom()` -- BETTER than -- `toPromise()`💡
  * Reason:🧠deprecate `toPromise()`🧠

* `firstValueFrom()` & `lastValueFrom()`
  * == built-in static conversion functions

### `lastValueFrom`

* TODO: The `lastValueFrom` is almost exactly the same as `toPromise()` meaning that it will resolve with the last value that has
arrived when the Observable completes, but with the difference in behavior when Observable completes without emitting a
single value. When Observable completes without emitting, `toPromise()` will successfully resolve with `undefined` (thus
the return type change), while the `lastValueFrom` will reject with the {@link EmptyError}. Thus, the return type of the
`lastValueFrom` is `Promise<T>`, just like `toPromise()` had in RxJS 6.

#### Example

```ts
import { interval, take, lastValueFrom } from 'rxjs';

async function execute() {
  const source$ = interval(2000).pipe(take(10));
  const finalNumber = await lastValueFrom(source$);
  console.log(`The final number is ${finalNumber}`);
}

execute();

// Expected output:
// "The final number is 9"
```

### `firstValueFrom`

* uses
  * take the first value / 👀WITHOUT waiting complete the Observable👀

* how does it work?
  * resolve a Promise /
    * first value emitted -- from the -- Observable
    * IMMEDIATELY unsubscribe
  * if the Observable completes / NO values emitted -> reject -- with an -- `EmptyError` /
    * 's message == Observable's message

## use default value

* allows
  * 👀avoid that promises / created by `lastValueFrom` OR `firstValueFrom`, reject -- with -- `EmptyError`👀
    * == used | source Observable completes WITHOUT emitting values

* `firstValueFrom(sourceObservable, {defaultValue: someValue})` & `lastValueFrom(sourceObservable, {defaultValue: someValue})`

## Warning

* 👀if you know that Observable /
  * eventually complete -> use `lastValueFrom()` function
  * emit >=1 value OR eventually complete -> use `firstValueFrom()` function👀
* if the source Observable does NOT complete OR emit ->
  * end up with
    * Promise / hung up
    * ALL async function's state / hang out in memory
  * use
    * `timeout`
    * `take`
    * `takeWhile`
    * `takeUntil`
