function fetchImage(src) {
  return new Promise((res, rej) => {
    const img = new Image();
    img.onload = res;
    img.onerror = rej;
    img.src = src;
  });
}

fetchImage('https://www.fillmurray.com/200/300').then(
  () => console.log('image loaded'),
  () => console.log('image failed')
);
