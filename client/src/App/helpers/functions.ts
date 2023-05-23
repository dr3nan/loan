export const dateFormat = (date: Date): string => {
  const formatted = date.toISOString().split('T')[0];
  return formatted;
};

export const numberTypeConversionWithDecimal = (value: number | string): string => {
  const loanAmount = typeof value === 'number' ? value : parseFloat(value);
  return loanAmount.toFixed(2);
};
