function countKids(...allMyChildren) {
  return `You have ${allMyChildren.length} children!`;
}

countKids('Talan', 'Jonathan');

function family(spouse, ...kids) {
  return `You are married to ${spouse} with ${kids.length} kids`;
}

family('Christina', 'Talan', 'Jonathan');

//----

function pluck(object, ...props) {
  return props.map(function(property) {
    return object[property];
  });
}
