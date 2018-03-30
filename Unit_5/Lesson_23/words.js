const myString = Object("Iterables are quite something");
myString[Symbol.iterator] = function* () {
  for (const word of this.split(' ')) yield word;
}
const words = [ ...myString ]
