import { Nobles } from "./heros.js";
import fs from "fs";

export function GetAllSubsets(theArray, minLength) {
  return theArray
    .reduce(
      (subsets, value) => subsets.concat(subsets.map((set) => [value, ...set])),
      [[]]
    )
    .sort(function (a, b) {
      return b.length - a.length;
    })
    .filter((el) => el.length >= minLength);
}

export function Stringify(arr) {
  let r = "";
  for (let sub of arr) {
    let nobles_count = 0;
    r = r + "(" + sub.length + ")";
    for (let hero of sub) {
      r = r + ", " + hero;
      if (Nobles.indexOf(hero) !== -1) {
        nobles_count += 1;
      }
    }
    r = r + " (Nobles: " + nobles_count + ") " + "\n";
  }
  return r;
}

export function Write(path, data) {
  try {
    fs.writeFileSync(path, data);
  } catch (err) {
    console.error(err);
  }
}
