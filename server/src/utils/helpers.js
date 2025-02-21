export const findHighestAlphabet = (alphabets) => {
  if (alphabets.length === 0) return null;
  return alphabets.reduce((highest, current) => {
    return current.toLowerCase() > highest.toLowerCase() ? current : highest;
  });
};
