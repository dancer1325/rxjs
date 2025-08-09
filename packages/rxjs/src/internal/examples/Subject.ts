import { Subject } from 'rxjs';

// 1. new Subject<T>()
const subjectConstructor = new Subject<number>();
console.log("typeof subjectConstructor ", typeof subjectConstructor);
console.log("subjectConstructor.constructor.name", subjectConstructor.constructor.name);      // Subject

// 2. next(value: T)
const subjectGenericType = new Subject();
// 2.1 read values FROM subscribe
subjectGenericType.next(1);     // NOT read, because hit BEFORE subscribing it

// 2.2 read values FROM subscribe
subjectGenericType.subscribe(x => {console.log("subjectGenericType - next - ", x)});
subjectGenericType.next({});    // read, because ALREADY observer subscribe | this subject

// 3. unsubscribe()
subjectGenericType.unsubscribe();
//subjectGenericType.next(2);         // throw an error   -- uncomment to check it

// 4. asObservable()
class UserService {
  private _users$ = new Subject<string>();    // private Subject    == can NOT be used | OUTSIDE this class

  // public Observable    == can be used | OUTSIDE this class
  public users$ = this._users$.asObservable();

  // ONLY service can emit
  addUser(name: string) {
    this._users$.next(`asObservable() - addUser - ${name}`);
  }

  // ONLY service can complete the Subject
  completeUsers() {
    this._users$.complete();
  }
}

const service = new UserService();

// 4.1 you can subscribe -- through -- Observable
service.users$.subscribe({
  next: user => console.log('asObservable() - observable - next - ', user),
  complete: () => console.log('asObservable() - observable - completed')
});

// 4.2 through Service, you can interact -- with the -- Subject
service.addUser('Alice');
service.addUser('Bob');
service.completeUsers();

// OUTSIDE class, you can NOT interact -- with the -- Subject
// service.users$.next('Hacker');     // Error: Property 'next' does not exist
// service.users$.complete();         // Error: Property 'complete' does not exist

//console.log('asObservable() - subject methods AVAILABLE ', Object.getOwnPropertyNames(service._users$));    Error: NOT ALLOWED to access
console.log('Observable - observable - prototype ', Object.getOwnPropertyNames(Object.getPrototypeOf(service.users$)));   // NOT has Subject's properties, because it's an observable
console.log('asObservable() - observable - properties ', Object.getOwnPropertyNames(service.users$));
