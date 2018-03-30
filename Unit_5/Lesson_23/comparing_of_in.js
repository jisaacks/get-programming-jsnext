const obj = { series: "Get Programming", publisher: "Manning" };
const arr = [ "Get Programming", "Manning" ];

for (const name in obj) {
  console.log(name);
}

for (const name of arr) {
  console.log(name);
}
