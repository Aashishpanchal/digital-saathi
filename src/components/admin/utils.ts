export const getPayload = (
  original: { [key: string]: any },
  payload?: Array<string>
) => {
  let result: { [key: string]: any } = {};
  if (payload) {
    payload?.map((item) => {
      result[item] = original[item];
    });
  }
  return result;
};
