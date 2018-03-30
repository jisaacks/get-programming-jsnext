function interlace(strs, vals, processer=String) {
  vals = [ ...vals ];
  return strs.reduce((all, str) => {
    return all + processer(vals.shift()) + str;
  });
}

const htmlSafe = (strs, ...vals) => interlace(strs, vals, htmlEscape);
