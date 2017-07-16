export const dedup = (exerciseNames) => {
  const result = new Set();

  for (const name of exerciseNames) {
    result.add(name);
  }

  return Array.from(result);
}
