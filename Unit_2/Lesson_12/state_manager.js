function createStateManager() {
  const state = {};
  return {
    update(changes) {
      Object.assign(state, changes);
    },
    getState() {
      return Object.assign({}, state);
    }
  }
}

function setValue(name, value) {
  stateManager.update({
    [name]: value
  });
}
