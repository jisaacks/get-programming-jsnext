const surname = "Isaacks";
const letters = [ ...surname ];
console.log(letters);

const easyAs = [ ...'123', 'ABC' ];
console.log(easyAs);


const vowels = ['A', 'E', 'I', 'O', 'U'];
const consonants = 'BCDFGHJKLMNPQRSTVWXYZ';

const alphabet = [ ...vowels, ...consonants ].sort();

console.log(alphabet.length);
