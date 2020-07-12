export const ERRORS = {
  default: {
    title: "Something went wrong",
  },
  EXIT: {
    title: "Are you sure you want to exit?",
  },
};

export const getButtonByType = (type, mode) => {
  let ButtonText = {
    EXIT: ["Yes", "No"],
    default: ["Retry", mode ? "Exit" : "Back"],
  };
  return ButtonText[type] || ButtonText["default"];
};

export const getErrorByType = (type, mode) => {
  console.error(mode);
  let payload = ERRORS[type] || ERRORS["default"];
  return { ...payload, buttons: getButtonByType(type, mode) };
};
