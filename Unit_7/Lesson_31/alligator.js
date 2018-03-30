const later = new Promise((resolve, reject) => {
  // Do something asynchronously
  resolve('alligator');
});

later.then(response => {
  console.log(response);
});
