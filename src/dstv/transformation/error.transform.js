import { getErrorByType } from "@/dstv/constants/errorMsg";
export const transformErrorData = (error = {}) => {
  let payload = getErrorByType(error.type, error.exit);
  payload.buttons = payload.buttons.map((item, index) => ({
    displayName: item,
    action: !index,
  }));
  return { ...payload, ...error };
};
