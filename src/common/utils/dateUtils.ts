const parseISTDate = (date: Date | string): [number, number, number] => {
  const [y, m, d] = new Date(date).toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' }).split('-').map(Number);
  return [y, m, d];
};

export const formatDate = (date: Date | string): string => {
  const [year, month, day] = parseISTDate(date);
  const localMidnight = new Date(year, month - 1, day);
  const monthStr = localMidnight.toLocaleDateString('en-US', { month: 'long' });
  return `${day} ${monthStr}, ${year}`;
};

export const formatDateSimple = (date: Date | string): string => {
  const [year, month, day] = parseISTDate(date);
  const localMidnight = new Date(year, month - 1, day);
  const monthStr = localMidnight.toLocaleDateString('en-US', { month: 'long' });
  return `${day} ${monthStr}`;
};

export const formatDateTime = (date: Date | string): string => {
  return new Date(date).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Asia/Kolkata'
  });
};

export const formatDateRangeWithDuration = (startDate: string, endDate: string): string => {
  const [sy, sm, sd] = parseISTDate(startDate);
  const [ey, em, ed] = parseISTDate(endDate);
  const start = new Date(sy, sm - 1, sd);
  const end = new Date(ey, em - 1, ed);
  const diffDays = Math.round((end.getTime() - start.getTime()) / 86400000) + 1;
  const nights = diffDays - 1;
  const fmt = (d: Date) => `${d.toLocaleDateString('en-US', { month: 'short' })} ${d.getDate()}, ${d.getFullYear()}`;
  return `${fmt(start)} - ${fmt(end)} • ${diffDays}D/${nights}N`;
};

export const formatDurationOnly = (startDate: string, endDate: string): string => {
  const [sy, sm, sd] = parseISTDate(startDate);
  const [ey, em, ed] = parseISTDate(endDate);
  const start = new Date(sy, sm - 1, sd);
  const end = new Date(ey, em - 1, ed);
  const diffDays = Math.round((end.getTime() - start.getTime()) / 86400000) + 1;
  const nights = diffDays - 1;
  return `${diffDays}D/${nights}N`;
};

export const formatTimeTo12Hour = (timeString: string): string => {
  const [hours, minutes] = timeString.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12; // Convert 0 to 12 for 12 AM
  return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
};

export const calculateYearsFromDate = (dateString: string): number => {
  const givenDate = new Date(dateString);
  const today = new Date();

  let years = today.getFullYear() - givenDate.getFullYear();
  const monthDifference = today.getMonth() - givenDate.getMonth();

  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < givenDate.getDate())) {
    years--;
  }

  if (years == 0) {
    return 1
  }
  
  return years;
};