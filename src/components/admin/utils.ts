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

export const margeObj = (
  init: { [key: string]: any },
  data: { [key: string]: any }
) => {
  let newObj: { [key: string]: any } = {};
  Object.keys(init).forEach((key) => {
    newObj[key] = data[key] === null ? "" : data[key];
  });
  return newObj;
};

export const queryToStr = (queryObj: { [key: string]: any }) => {
  const query = [];
  for (const key in queryObj) {
    query.push(
      encodeURIComponent(key)
        .concat("=")
        .concat(encodeURIComponent(queryObj[key]))
    );
  }
  return query.length ? query.join("&") : "";
};
