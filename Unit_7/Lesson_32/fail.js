async function fail() {
  const msg = await Promise.reject('I failed.');
  return 'I Succeeded.';
};

fail().then(msg => console.log(msg), msg => console.log(msg))

async function tryTest() {
  try {
    return Promise.reject('err err');
  } catch(err) {
    return Promise.resolve(`caught: ${err}`);
  }
}

tryTest().then(response => {
  console.log('response:', response);
});
