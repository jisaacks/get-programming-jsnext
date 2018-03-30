const add = (a, b) => a + b;
const rand = () => Math.random();

const exponent = exp => base => base ** exp

const square   = exponent(2)
const cube     = exponent(3)
const powerOf4 = exponent(4)

square(5)
cube(5)
powerOf4(5)

function pluck(object, ...props) {
  return props.map( prop => object[prop] );
}
