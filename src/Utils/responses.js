export const response = (state, message, data) => {
  let res;
  if (state) {
     res = { success: true, message, content: data };
  } else {
     res = { success: false, message, content: data };
  }
  return res;
};