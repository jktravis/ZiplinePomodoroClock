export function pad(number, length) {
  let str = '' + number;
  while (str.length < length) {
    str = '0' + str;
  }
  return str;
}

export function formatTime(time) {
  const newTime = time / 10;
  const min = parseInt(newTime / 6000, 10),
    sec = parseInt(newTime / 100, 10) - (min * 60);
  return (min > 0 ? pad(min, 2) : "00") + ":" + pad(sec, 2);
}

export function convertMinToMilli(mins) {
  return parseInt(mins * 60 * 1000, 10);
}

export function getProgressBarValue(current, total) {
  return (Math.floor(100 - (current / total) * 100));

}