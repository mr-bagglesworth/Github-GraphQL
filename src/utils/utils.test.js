import { dateFormat, abbrev, repoSize, objMake, arrMake, arrToObj } from "./utils";

test("formats time and date correctly", () => {
  expect(dateFormat("2019-03-04T13:36:36Z")).toBe("2019-03-04");
  expect(dateFormat("2019-01-15T00:56:02Z")).toBe("2019-01-15");
  expect(dateFormat("2029-01-15T00:56:02Z")).toBe("2029-01-15");
});

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

// object and array functions used in repo lang chart
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
