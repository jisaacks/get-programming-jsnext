function* myGeneratorFunction() {
  console.log('Started')
  let recievedA = yield 'a';
  console.log('recievedA:', recievedA);
  let recievedB = yield 'b';
  console.log('recievedB:', recievedB);
}

const myGenerator = myGeneratorFunction();

let gotA = myGenerator.next(0);
console.log('gotA:', gotA);
let gotB = myGenerator.next(1);
console.log('gotB:', gotB);
let gotC = myGenerator.next(2);
console.log('gotC:', gotC);
