import { interval, firstValueFrom, NEVER, timeout } from 'rxjs';

async function testFirstValueFrom() {
  const source$ = interval(2000);
  const firstNumber = await firstValueFrom(source$);
  console.log(`firstValueFrom - ${firstNumber}`);
}
testFirstValueFrom();

// 2. observable / NEVER emit
async function observableNeverEmit() {
  const neverEmits$ = NEVER;

  // 2.1 promise is hung up
  //const neverEmitsFirstValue = await firstValueFrom(neverEmits$);   // uncomment to see NEXT lines are NOT reached
  //console.log('firstValueFrom - observable / NEVER emit - promise is hung up');

  // 2.2 avoid hanging up promises
  try {
    const result = await firstValueFrom(
      neverEmits$.pipe(timeout(1000))
    );
    console.log('firstValueFrom - observable / NEVER emit - avoid hanging up - ', result);      // TODO: is it NOT reached? that's NOT the goal of using timeout?
  } catch (error) {
    // @ts-ignore
    console.log('firstValueFrom - observable / NEVER emit - avoid hanging up - error ', error.message);
  }
}
observableNeverEmit();
