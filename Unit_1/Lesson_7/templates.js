function fa(icon) {
  return `fa-${icon} fa`;
}

fa('check-square');

//---

function logParts() {
  let stringParts = arguments[0];
  let values = [].slice.call(arguments, 1);  <1>
  console.log( 'Strings:', stringParts );
  console.log( 'Values:', values );
}

logParts`1${2}3${4}${5}`;

//---

function noop() {
  let stringParts = arguments[0];
  let values = [].slice.call(arguments, 1);
  return stringParts.reduce(function(memo, nextPart) {
    return memo + String(values.shift()) + nextPart;
  });
}

noop`1${2}3${4}${5}`;

//---

function stripWS() {
  let stringParts = arguments[0];
  let values = [].slice.call(arguments, 1);
  let str = stringParts.reduce(function(memo, nextPart) {
    return memo + String(values.shift()) + nextPart;
  });
  return str.replace(/\n\s*/g, '');
}

function getProductHTML(product) {
  return stripWS`
    <div class="product">
      <div class="product-image">
        <img alt="${product.name}" src="${product.image_url}">
      </div>
      <div class="product-desc">${product.desc}</div>
    </div>
  `;
}
