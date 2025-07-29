import { of, switchMap, catchError } from 'rxjs';               // 1. 'rxjs'
import { map } from 'rxjs/operators';                           // 2. 'rxjs/operators'        == deprecated way
import { ajax } from 'rxjs/ajax';                               // 3. 'rxjs/ajax'
import { fromFetch } from 'rxjs/fetch';                         // 4. 'rxjs/fetch'
import { webSocket } from 'rxjs/webSocket';                     // 5. 'rxjs/webSocket'

// 1. & 2.
const observable = of(1,2,3)

observable.pipe(
  map(x => x * 2)
).subscribe((x) => console.log(x))

// 3. | NODE.JS, NOT work
// ajax('https://jsonplaceholder.typicode.com/posts/1')
//   .subscribe(response => console.log(response.response));

// 4.
fromFetch('https://api.github.com/users/octocat')
  .pipe(
    switchMap(response => response.json()),
    catchError(error => of({ error: true, message: error.message }))
  )
  .subscribe(data => console.log(data));

// 5.
// TODO: ReferenceError: WebSocket is not defined
/*const socket$ = webSocket('ws://localhost:8080');

socket$.subscribe(
  message => console.log('Mensaje recibido:', message),
  error => console.error('Error:', error),
  () => console.log('Conexión cerrada')
);

socket$.next({ type: 'greeting', data: 'Hola servidor!' });*/
