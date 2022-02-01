/* eslint-disable no-bitwise */
export const stringToColor = string => {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.substr(-2);
  }

  return color;
};

const monthsLong = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const monthsShort = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const daysShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const daysLong = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const getHours = date => {
  let hour = date.getHours();
  let ampm = 'AM';
  if (hour > 12) {
    hour -= 12;
    ampm = 'PM';
  }
  return {hour, ampm};
};

const getMinutes = date => {
  const minutes = date.getMinutes();
  return minutes === 0 ? '' : `:${minutes}`;
};

export const getLongDate = date => {
  const {hour, ampm} = getHours(date);

  return `${daysLong[date.getDay()]}, ${
    monthsShort[date.getMonth()]
  } ${date.getDate()}, ${date.getFullYear()} ${hour}${getMinutes(
    date,
  )} ${ampm} `;
};

export const getShortDate = date => {
  const {hour, ampm} = getHours(date);

  return `${daysShort[date.getDay()]}, ${
    monthsShort[date.getMonth()]
  } ${date.getDate()}, ${date.getFullYear()} ${hour}${getMinutes(
    date,
  )} ${ampm} `;
};

export const getDateYMD = date => {
  const month = date.getMonth() + 1;
  let monthStr = `${month}`;
  if (month < 10) {
    monthStr = `0${month}`;
  }
  return `${date.getFullYear()}-${monthStr}-${date.getDate()}`;
};
