function filter (obs$, fn) {
  return new Observable(observer => obs$.subscribe({
    next(val) {
      if (fn(val)) observer.next(val);
    }
  }));
}

filter(Observable.of(1, 2, 3, 4, 5), n => n % 2).subscribe({
  next(val) {
    console.log('filtered: ', val);
  }
});
