myArray[Symbol.iterator] = function* () {
  const copy = [ ...this ]; <1>
  copy.reverse();
  for (const item of copy) yield item;
}
const backwards = [ ...myArray ]
