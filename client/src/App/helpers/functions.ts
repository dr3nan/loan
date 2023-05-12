export const dateFormat = (date: Date): string => {
  const formatted = date.toISOString().split('T')[0];
  return formatted;
};
