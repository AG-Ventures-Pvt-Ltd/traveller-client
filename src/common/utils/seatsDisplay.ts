export const getSeatsDisplay = (seats: number): string => {
  if (seats >= 15 && seats <= 25) {
    return `${seats-5}-${seats}`;
  } else if (seats >= 5 && seats <= 14) {
    return `${seats-2}-${seats}`;
  } else if (seats > 25) {
    return `${seats-8}-${seats}`;
  } else {
    return `${seats-8} - ${seats}`;
  }
};