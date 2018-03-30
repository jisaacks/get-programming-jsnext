export function wait(iterator, milliseconds, callback) {
  const int = setInterval(() => {
    const { done } = iterator.next();
    if (done) {
      clearInterval(int);
      callback();
    }
  }, milliseconds);
}
