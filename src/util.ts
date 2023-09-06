import { Nobles } from "./heros.js";
import {promises as fsPromises} from "fs";
import {dirname} from "path";

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

export async function Write(filePath, fileContent) {
  try {
    await fsPromises.mkdir(dirname(filePath), { recursive: true });
    await fsPromises.writeFile(filePath, fileContent, 'utf-8');
  } catch (err) {
    console.error(err);
  }
}
