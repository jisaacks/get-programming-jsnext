function createTag(func) {
  return function() {
    const strs = arguments[0];
    const vals = [].slice.call(arguments, 1);
    return func(strs, vals);
  }
}

function interlace(strs, vals) {
  vals = vals.slice(0);
  return strs.reduce(function(all, str) {
    return all + String(vals.shift()) + str;
  });
}

function htmlEscape (str) {
  str = str.replace(/</g, '&lt;');
  str = str.replace(/>/g, '&gt;');
  return str;
}

const htmlSafe = createTag(function(strs, vals){
  return interlace(strs, vals.map(htmlEscape));
});


const expand = function(parts, items){
  const start = parts[0];
  const end   = parts[1];
  const mapped = items.map(function(item){
      return start + item + end;
  });

  return mapped.join('');
};


const lessons = [
  'Declaring Variables with let',
  'Declaring constants with const',
  'New String Methods',
  'Template Literals',
]

const html = `<ul>${
  expand`<li>${lessons}</il>`
}</ul>`
