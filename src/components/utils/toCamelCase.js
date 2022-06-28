export const toCamelCase = text => {
  return text
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (leftTrim, index) =>
      index === 0 ? leftTrim.toLowerCase() : leftTrim.toUpperCase(),
    )
    .replace(/\s+/g, "");
};

export default toCamelCase;