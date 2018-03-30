function* infinite() {
  let i = 0;
  while (true) {
    yield i++;
  }
}

function* fibonacci() {
  let prev = 0, next = 1;

  for (;;) {
    yield next;
    [next, prev] = [next + prev, next];
  }
}

function take(gen, count) {
  return Array(count).fill(1).map(
    () => gen.next().value
  );
}

take(infinite(), 7);
take(fibonacci(), 7);
