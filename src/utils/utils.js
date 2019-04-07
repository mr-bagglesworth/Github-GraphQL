// date format function
const dateFormat = string => {
  return string.split("T")[0];
};

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

// make objects and arrays
const objMake = (obj, key) => Object.keys(obj).map((v, i) => Object.assign({}, obj[i][key]));
const arrMake = (obj, key) => Object.keys(obj).map((v, i) => obj[i][key]);

// add array to object
const arrToObj = (objArr, arr) => objArr.map((v, i) => Object.assign({ size: arr[i] }, objArr[i]));

export { dateFormat, abbrev, repoSize, objMake, arrMake, arrToObj };
