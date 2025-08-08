# Importing instructions

* -- depends on --
  * used RxJS version
  * used installation method

* `import  from 'rxjs/operators'`
  * -- thanks to -- [Pipeable operators](https://v6.rxjs.dev/guide/v6/pipeable-operators)
    * introduced | RxJS version 5.5
    * enable ALL operators can be exported -- from -- 1! place
  * _Example:_ `import { map } from 'rxjs/operators'`

## | RxJS v7.2.0

* 💡MOST operators have been moved -- to -- `'rxjs'`💡
  * ==`import  from 'rxjs'`
  * DIFFERENT naming -- `oldNameWith` --

* `'rxjs/operators'` export site
  * ⚠️deprecated⚠️
    * == | SOME next major version, it will be removed

## | RxJS v7, export sites

* `'rxjs'`
* `'rxjs/operators'`
* `'rxjs/ajax'`
* `'rxjs/fetch'`
* `'rxjs/webSocket'`
* `'rxjs/testing'`

### How to migrate?

| `'rxjs/operators'` Operator                             | Replace -- with -- 👀NEW Static Creation Operator👀 | Replace -- with -- 👀NEW Operator Name👀 |
| ------------------------------------------------------- |-----------------------------------------------------|------------------------------------------|
| [`combineLatest`](/api/operators/combineLatest)         | `combineLatest`                                     | `combineLatestWith`                      |
| [`concat`](/api/operators/concat)                       | `concat`                                            | `concatWith`                             |
| [`merge`](/api/operators/merge)                         | `merge`                                             | `mergeWith`                              |
| [`onErrorResumeNext`](/api/operators/onErrorResumeNext) | `onErrorResumeNext`                                 | `onErrorResumeNextWith`                  |
| [`race`](/api/operators/race)                           | `race`                                              | `raceWith`                               |
| [`zip`](/api/operators/zip)                             | `zip`                                               | `zipWith`                                |

* EXCEPTION
  * `partition`
    * SAME name

* TODO:
For example, the old and deprecated way of using [`merge`](/api/operators/merge) from `'rxjs/operators'`
is:

```ts
import { merge } from 'rxjs/operators';

a$.pipe(merge(b$)).subscribe();
```

But this should be avoided and replaced with one of the next two examples.

For example, this could be replaced by using a static creation {@link merge} function:

```ts
import { merge } from 'rxjs';

merge(a$, b$).subscribe();
```

Or it could be written using a pipeable {@link mergeWith} operator:

```ts
import { mergeWith } from 'rxjs';

a$.pipe(mergeWith(b$)).subscribe();
```

Depending on the preferred style, you can choose which one to follow, they are completely equal.

Since a new way of importing operators is introduced with RxJS v7.2.0, instructions will be split to
prior and after this version.

### ES6 via npm

If you've installed RxJS using {@link guide/installation#es6-via-npm ES6 via npm} and installed version
is:

#### v7.2.0 or later

Import only what you need:

```ts
import { of, map } from 'rxjs';

of(1, 2, 3).pipe(map((x) => x + '!!!')); // etc
```

To import the entire set of functionality:

```ts
import * as rxjs from 'rxjs';

rxjs.of(1, 2, 3).pipe(rxjs.map((x) => x + '!!!')); // etc;
```

To use with a globally imported bundle:

```js
const { of, map } = rxjs;

of(1, 2, 3).pipe(map((x) => x + '!!!')); // etc
```

If you installed RxJS version:

#### v7.1.0 or older

Import only what you need:

```ts
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

of(1, 2, 3).pipe(map((x) => x + '!!!')); // etc
```

To import the entire set of functionality:

```ts
import * as rxjs from 'rxjs';
import * as operators from 'rxjs';

rxjs.of(1, 2, 3).pipe(operators.map((x) => x + '!!!')); // etc;
```

To use with a globally imported bundle:

```js
const { of } = rxjs;
const { map } = rxjs.operators;

of(1, 2, 3).pipe(map((x) => x + '!!!')); // etc
```

### CDN

If you installed a library {@link guide/installation#cdn using CDN}, the global namespace for rxjs is
`rxjs`.

#### v7.2.0 or later

```js
const { range, filter, map } = rxjs;

range(1, 200)
  .pipe(
    filter((x) => x % 2 === 1),
    map((x) => x + x)
  )
  .subscribe((x) => console.log(x));
```

#### v7.1.0 or older

```js
const { range } = rxjs;
const { filter, map } = rxjs.operators;

range(1, 200)
  .pipe(
    filter((x) => x % 2 === 1),
    map((x) => x + x)
  )
  .subscribe((x) => console.log(x));
```
