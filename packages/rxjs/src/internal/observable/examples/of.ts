import { of } from 'rxjs';

// emit the values `10, 20, 30`
of(10, 20, 30)
  .subscribe({
    next: value => console.log('next:', value),
    error: err => console.log('error:', err),
    complete: () => console.log('the end'),
  });

// emit   [1, 2, 3]
of([1, 2, 3])
  .subscribe({
    next: value => console.log('next:', value),
    error: err => console.log('error:', err),
    complete: () => console.log('the end'),
  });