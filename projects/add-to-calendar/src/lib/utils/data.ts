const identity = (str: string) => str;

/**
 * Creates a param string from a flat key-value pair.
 */
export const toParamString = (
  params,
  delimiter = ";",
  transformFn = identity
) => {
  const paramString = [];

  for (let key in params) {
    if (params.hasOwnProperty(key) && params[key] !== undefined) {
      paramString.push(`${key}=${transformFn(params[key])}`);
    }
  }

  return paramString.join(delimiter);
};

/**
 * Creates a query string from a flat key-value pair.
 */
export const toQueryString = params =>
  toParamString(params, "&", encodeURIComponent);

/**
 * Creates an ICS param string from a flat key-value pair.
 */
export const toIcsParamString = params => toParamString(params, ";");
