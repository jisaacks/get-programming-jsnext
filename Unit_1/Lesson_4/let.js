//------------

let read, write;
{
  let data = {};

  write = function (key, val) {
    data[key] = val;
  }

  read = function (key) {
    return data[key];
  }
}

write('message', 'Welcome to ES6!');
read('message');
// console.log(data); This line commented out because it errors

//------------

let num = 0;
function getNum() {
  if (!num) {
    num = 1;
  }
  return num;
}
console.log( getNum() );

//------------
