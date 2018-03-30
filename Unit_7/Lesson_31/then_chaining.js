Promise.resolve(1)
  .then(number => number + 1) <1>
  .then(number => number + 1) <2>
  .then(number => number + 1) <3>
  .then(number => {
    console.log(number) <4>
  });
