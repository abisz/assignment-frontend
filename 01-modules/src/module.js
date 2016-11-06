const regex = /^(\w+)\.(\w{3})-(b|m)(\d{4})@fh-salzburg\.ac\.at$/;

export function valid(email) {
  return regex.test(email);
}

export function degreeProgram(email) {
  const result = regex.exec(email);
  if (result) return result[2].toUpperCase();
  return false;
}

export function level(email) {
  const result = regex.exec(email);
  if (result) {
    const degree = result[3];
    if (degree === 'b') return 'BA';
    else return 'MA';
  }
  return false;
}

export function graduationYear(email) {
  const result = regex.exec(email);
  if (result) {
    const degree = result[3],
      year = parseInt(result[4]);
    if (degree === 'b') return year + 3;
    else return year + 2;
  }
  return false;
}
