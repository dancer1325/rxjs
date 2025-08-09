# Conversion to Promises

* Observables vs Promises
  * SAME
    * [collections](../guide/observable) / may produce values | time
  * ⚠️DIFFERENCE ⚠️
    * NUMBER of values / produced
      * Observables may produce >= 0 values
      * Promises may produce 1! value | resolve successfully

## Issues

For this reason, in RxJS 7, the return type of the Observable's [`toPromise()`](/api/index/class/Observable#toPromise)
method has been fixed to better reflect the fact that Observables can yield zero values. This may be a **breaking
change** to some projects as the return type was changed from `Promise<T>` to `Promise<T | undefined>`.

Also, `toPromise()` method name was never indicating what emitted value a Promise will resolve with because Observables
can produce multiple values over time. When converting to a Promise, you might want to choose which value to pick -
either the first value that has arrived or the last one. To fix all these issues, we decided to deprecate `toPromise()`,
and to introduce the two new helper functions for conversion to Promises.

## recommendations

* 💡use `firstValueFrom()` OR `lastValueFrom()` -- BETTER than -- `toPromise()`💡
  * Reason:🧠deprecate `toPromise()`🧠

* `firstValueFrom()` & `lastValueFrom()`
  * == built-in static conversion functions

### `lastValueFrom`

The `lastValueFrom` is almost exactly the same as `toPromise()` meaning that it will resolve with the last value that has
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
