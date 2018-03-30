async function allResolved(promises) {
  const resolved = [];
  const handlers = promises.map(promise => (
    promise
      .then(resp => resolved.push(resp))
      .catch(() => { /* skip rejects */ })
  ));
  await Promise.all(handlers);
  return resolved;
}
