const instances = new Map();
export default function Singleton(constructor) {
  if (!instances.has(constructor)) {
    instances.set(constructor, new constructor());
  }
  return instances.get(constructor);
}

console.log(Singleton(Array))
console.log(Singleton(Array).length)
console.log(Singleton(Array).push("new value"))
console.log(Singleton(Array).push("another value"))
console.log(Singleton(Array).length)
const now = Singleton(Date)
setTimeout(() => {
  const later = Singleton(Date)
  console.log(now === later)
}, 10000)
