// date functions
// - date format
const dateFormat = string => {
  const options = { year: "numeric", month: "numeric", day: "numeric" };
  return new Date(string).toLocaleDateString("en-GB", options);
};

// - get days between two dates
const dateDiff = (newest, oldest) => {
  // no date is 0, return 100 to make one column
  if (newest === 0 || oldest === 0) return 100;
  else if (newest === oldest) return 1;
  const a = new Date(newest);
  const b = new Date(oldest);
  return Math.round((a - b) / (1000 * 60 * 60 * 24));
};

// date creation function
// - creates a date based on the item index and staring date in array
const arrDate = (start, index) => {
  const options = { year: "numeric", month: "numeric", day: "numeric" };
  return new Date(new Date(start).getTime() + 60 * 60 * (24 * index) * 1000).toLocaleDateString("en-GB", options);
};

// - - - - - - - - -
// abbreviate function
const abbrev = (string, length) => {
  return string.length > length ? `${string.slice(0, length)}...` : string;
};

// repo size function - convert combined filesize to a nicer format
// - mb > 1 million
// - kb > 1 thousand
const repoSize = size => {
  const band = {
    u: [0, 0, "bytes"],
    k: [3, 1, "kb"],
    m: [6, 2, "mb"]
  };
  const prefix = size < Math.pow(10, 6) ? (size < Math.pow(10, 3) ? band.u : band.k) : band.m;
  return `${(size / Math.pow(10, prefix[0])).toFixed(prefix[1])} ${prefix[2]}`;
};

// - - - - - - - - -
// object and array functions
// - make objects and arrays from keys
const objMake = (obj, key) => Object.keys(obj).map((v, i) => Object.assign({}, obj[i][key]));
const arrMake = (obj, key) => Object.keys(obj).map((v, i) => obj[i][key]);

// add array to object size key
const arrToObj = (objArr, arr) => objArr.map((v, i) => Object.assign({ size: arr[i] }, objArr[i]));

// get greatest value from a certain property in array of objects
// const topNumber = (arr, prop) => arr.reduce((a, b) => Math.max(a[prop], b[prop]));
// , topNumber

export { dateFormat, dateDiff, arrDate, abbrev, repoSize, objMake, arrMake, arrToObj };
