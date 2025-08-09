import { interval, firstValueFrom, tap, finalize, EMPTY } from 'rxjs';

// 1. firstValueFrom()
async function testFirstValueFrom() {
  // 1.1 firstValueFrom(sourceObservable)
  const source$ = interval(1000).pipe(
    tap(value => console.log(`firstValueFrom(sourceObservable) - tap - next - ${value}`)),         // perform side-effects / NO alter the notification
    finalize(() => console.log('firstValueFrom(sourceObservable) - finalize'))    // called | observable finalizes (== complete OR error)
  );
  const firstNumber = await firstValueFrom(source$);
  console.log(`firstValueFrom(sourceObservable) - resolved - ${firstNumber}`);


  // 1.2 firstValueFrom(sourceObservable, {defaultValue: someValue})
  const firstValueFromWithDefault = await firstValueFrom(EMPTY, { defaultValue: 0 });
  console.log(`firstValueFrom(sourceObservable, {defaultValue: someValue}) - resolved - ${firstValueFromWithDefault}`);
}

testFirstValueFrom();

