export const DateFormatter = (data: any) => {
  let date;

  if (typeof data === 'number') {
    date = new Date(data); // Correctly handle Unix timestamp
  } else if (typeof data === 'string') {
    if (!isNaN(Number(data))) {
      date = new Date(Number(data)); // Convert timestamp string to number
    } else {
      date = new Date(data.replace(' ', 'T')); // Handle string datetime format
    }
  }
  return date;
};
