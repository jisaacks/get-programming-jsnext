let geolocation = {
  "location": {
    "lat": 51.0,
    "lng": -0.1
  },
  "accuracy": 1200.4
}

let { location: {lat, lng}, accuracy } = geolocation;

console.log(lat); // 51.0
console.log(lng); // -0.1
console.log(accuracy); // 1200.4
console.log(location); // undefined

//----

let coords = [51.0, -0.1];

let [lat, lng] = coords;

console.log(lat);
console.log(lng);

//----

let location = ['Atlanta', [33.7490, 84.3880]];

let [ place, [lat, lng] ] = location;

console.log(place); // "Atlanta"
console.log(lat); // 33.7490
console.log(lng); // 84.3880

//----

let product = {
  name: 'Whiskey Glass',
  details: {
    price: 18.99,
    description: 'Enjoy your whiskey in this glass'
  },
  images: {
    primary: '/images/main.jpg',
    others: [
      '/images/1.jpg',
      '/images/2.jpg'
    ]
  }
}

let {
  name,
  details: { price, description},
  images: {
    primary,
    others: [secondary, tertiary]
  }
} = product;

console.log(name);
console.log(price);
console.log(description);
console.log(primary);
console.log(secondary);
console.log(tertiary);

console.log(details);
console.log(images);
console.log(others);

//----

const { 0:a, 1:b, length } = ['foo', 'bar']

console.log(a)
console.log(b)
console.log(length)

//----

const [first, second, last] = 'abc'

console.log(first)
console.log(second)
console.log(last)
