const age = {
  number: 32,
  string: 'thirty-two',
  [Symbol.toPrimitive](hint) {
    switch(hint) {
      case 'string':
        return this.string;
      break;
      case 'number':
        return this.number;
      break;
      default:
        return `${this.string}(${this.number})`;
      break;
    }
  }
};

console.log(`
  I am ${age} years old, but by the time you
  read this I will be at least ${+age + 1}
`);                                                 
console.log( age + '' );                            
console.log( age.toString() );
