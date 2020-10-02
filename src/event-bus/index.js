import mitt from 'mitt';
export const focusHandler = new mitt();
let registered = false;
let actions = [];
const KEY_CODE = {
  37: "LEFT",
  38: "UP",
  39: "RIGHT",
  40: "DOWN",
};
export const enableNavigation = (actionCB) => {
  if (registered) {
    const index = actions.findIndex((item) => item.id === actionCB.id);
    if (index > -1) {
      actions[index] = actionCB;
    } else {
      actions.push(actionCB);
    }
  } else {
    registered = true;
    actions.push(actionCB);
    window.addEventListener("keydown", (event) => {
      actions.forEach((action) => {
        if (!action.preCondition || action.preCondition())
          return (
            action[KEY_CODE[event.keyCode]] && action[KEY_CODE[event.keyCode]]()
          );
      });
    });
  }
};
export const disableNavigation = (id) => {
  const index = actions.findIndex((item) => item.id === id);
  if (index > -1) {
    actions.splice(index, 1);
  }
};

export const registerFocus = (callback) => {
  focusHandler.on("FOCUS_CHANGE", callback);
};
export const unRegisterFocus = (callback) => {
  focusHandler.off("FOCUS_CHANGE", callback);
};
