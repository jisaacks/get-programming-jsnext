const myObj = { foo: 'bar' }
const myMap = new Map(Object.keys(myObj).map(key => [ key, myObj[key] ]))
