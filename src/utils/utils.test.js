import { dateFormat, dateDiff, arrDate, abbrev, repoSize, objMake, arrMake, arrToObj } from "./utils";
// , topNumber

// - - - - - - -
// date
// test("formats time and date correctly", () => {
//   expect(dateFormat("2019-03-04T13:36:36Z")).toBe("04/03/2019");
//   expect(dateFormat("2019-01-15T00:56:02Z")).toBe("15/01/2019");
//   expect(dateFormat("2029-01-15T00:56:02Z")).toBe("15/01/2029");
// });

test("gets number of days between two dates correctly", () => {
  expect(dateDiff("2019-03-04T13:36:36Z", "2019-03-03T13:36:36Z")).toBe(1);
  expect(dateDiff("2017-03-04T13:36:36Z", "2017-02-03T13:36:36Z")).toBe(29);
  expect(dateDiff("2019-04-10T14:20:00Z", "2014-10-03T10:00:00Z")).toBe(1650); // guessed within 1 day!
  // top 2 cases
  expect(dateDiff("2019-03-04T13:36:36Z", "2019-03-04T13:36:36Z")).toBe(1);
  expect(dateDiff("2019-03-04T13:36:36Z", 0)).toBe(100);
});

// test("creates a date based on starting value and index", () => {
//   expect(arrDate("2019-03-13T07:00:00Z", 2)).toBe("15/03/2019"); // increment by 2 days
// });

// - - - - - - -
// abbreviations
test("formats text with elipsis if over x characters long", () => {
  expect(abbrev("abcdefghijk", 25)).toBe("abcdefghijk");
  expect(abbrev("abcdefghijklmnopqrstuvwxyz", 25)).toBe("abcdefghijklmnopqrstuvwxy...");
});

// repo size function - bytes, kb, mb
test("formats repo size in bytes, kb, and mb according to total byte size of the repo", () => {
  expect(repoSize(1400000)).toBe("1.40 mb");
  expect(repoSize(144400)).toBe("144.4 kb");
  expect(repoSize(140)).toBe("140 bytes");
});

// - - - - - - -
// object and array functions
test("formats multidimensional object to array of objects", () => {
  const input = {
    0: {
      node: {
        color: "#4F5D95",
        name: "PHP"
      },
      size: 360949
    },
    1: {
      node: {
        color: "#563d7c",
        name: "CSS"
      },
      size: 546918
    }
  };
  const output = [
    {
      color: "#4F5D95",
      name: "PHP"
    },
    {
      color: "#563d7c",
      name: "CSS"
    }
  ];
  expect(objMake(input, "node")).toMatchObject(output);
});

test("creates an array from a property of a multidimensional object", () => {
  const input = {
    0: {
      node: {
        color: "#4F5D95",
        name: "PHP"
      },
      size: 360949
    },
    1: {
      node: {
        color: "#563d7c",
        name: "CSS"
      },
      size: 546918
    }
  };
  const output = [360949, 546918];
  expect(arrMake(input, "size")).toMatchObject(output);
});

test("pushes array values as new properties on objects in an array", () => {
  const objArr = [
    {
      color: "#4F5D95",
      name: "PHP"
    },
    {
      color: "#563d7c",
      name: "CSS"
    }
  ];
  const arr = [360949, 546918];
  const output = [
    {
      color: "#4F5D95",
      name: "PHP",
      size: 360949
    },
    {
      color: "#563d7c",
      name: "CSS",
      size: 546918
    }
  ];
  expect(arrToObj(objArr, arr)).toMatchObject(output);
});

// reduce - get greatest value of a property from array of objects
// test("gets greatest value of a property from array of objects", () => {
//   const input = [
//     {
//       commitCount: 2
//     },
//     {
//       commitCount: 3
//     },
//     {
//       commitCount: 3
//     },
//     {
//       commitCount: 12
//     }
//   ];

//   const output = 12;
//   expect(topNumber(input, "commitCount")).toMatchObject(output);
// });
