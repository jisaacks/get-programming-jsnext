function pop(set) {
  const last = [ ...set ].pop();
  set.delete(last);
  return last;
}

function shift(set) {
  const first = [ ...set ].shift();
  set.delete(first);
  return first;
}

function sendFirstToBack(set) {
  const arr = [ ...set ];
  arr.push( arr.shift() );
  return new Set(arr);
}
