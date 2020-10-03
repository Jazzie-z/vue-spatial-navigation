import mitt from "mitt";
export const focusHandler = new mitt();
let registered = false;
let actions = [];
let KEY_CODE = {
  37: "LEFT",
  38: "UP",
  39: "RIGHT",
  40: "DOWN",
  13: "SELECT",
  81: "BACK",
};
export const registerKeyMap = (keys) => {
  KEY_CODE = keys;
};
export const enableNavigation = (actionCB) => {
  if (registered) {
    const index = actions.findIndex((item) => item.id === actionCB.id);
    if (index > -1) {
      actions[index] = actionCB;
    } else {
      if (actionCB.callFirst) actions.unshift(actionCB);
      else actions.push(actionCB);
    }
  } else {
    registered = true;
    actions.push(actionCB);
    window.addEventListener("keydown", (event) => {
      actions.some((action) => {
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

export const FOCUS_CHANGE = "FOCUS_CHANGE";

export const registerFocusDispatcher = (callback) =>
  focusHandler.on(FOCUS_CHANGE, callback);
export const unRegisterFocusDispatcher = (callback) =>
  focusHandler.off(FOCUS_CHANGE, callback);
export const dispatchFocus = (payload) =>
  focusHandler.emit(FOCUS_CHANGE, payload);
