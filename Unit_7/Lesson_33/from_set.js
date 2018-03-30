Observable.from(new Set([1, 2, 3])).subscribe({
  start() {
    console.log('--- started getting values ---');
  },
  next(value) {
    console.log('==> next value', value);
  },
  complete(a) {
    console.log('--- done getting values ---');
  }
});
