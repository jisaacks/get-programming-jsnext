Promise.resolve()
  .then(() => console.log('A'))
  .then(() => Promise.reject('X'))
  .then(() => console.log('B'))
  .catch(err => console.log('caught:', err))
  .then(() => console.log('C'));
