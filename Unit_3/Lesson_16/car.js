function car({ make = 'Ford', model = 'Mustang', year = 2017 } = {}) {
  console.log(`${make}:${model}:${year}`)
}

let modern = car();                <1>
let classic = car({ year: 1965 });
