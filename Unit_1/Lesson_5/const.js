const ADD_ITEM = 'ADD_ITEM';
const DEL_ITEM = 'DEL_ITEM';
const CLEAR_ALL_ITEMS = 'CLEAR_ALL_ITEMS';
const items = [];

function actionHandler(action) {
  switch (action.type) {
    case ADD_ITEM:
      items.push(action.item);
    break;
    case DEL_ITEM:
      items.splice(items.indexOf(action.item), 1);
    break;
    case CLEAR_ALL_ITEMS:
      items.splice(0, items.length);
    break;
  };
}
