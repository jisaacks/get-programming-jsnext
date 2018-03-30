function avg() {
  const args = Array.from(arguments);
  const sum = args.reduce(function(a, b) {
    return a + b;
  });
  return sum / args.length;
}
