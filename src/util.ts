import {nobleCompanions} from "./companions";
import {promises as fsPromises} from "fs";
import {dirname} from "path";
import {CompanionList, CompanionSubsets} from "./types/companion-id.type";
import {NobleLordBasedComposition, NobleLordBasedCompositions} from "./types/noble-lord-based-compositions.type";
import {ResultComposition, ResultCompositions} from "./types/result-composiotion.type";

export function getAllSubsets(companionList: CompanionList, minLength: number): CompanionSubsets {
  return companionList
    .reduce<string[][]>(
      (companionSubsets, companionId) =>
        companionSubsets.concat(companionSubsets.map((set) => [companionId, ...set]))
      , [[]])
    .sort(function (companionListA, companionListB) {
      return companionListB.length - companionListA.length;
    })
    .filter((companionList) => companionList.length >= minLength);
}

export function stringifySubsets(companionSubsets: CompanionSubsets): string {
  let r = "";
  for (const companionList of companionSubsets) {
    let noblesCount = 0;
    r = r + "(" + companionList.length + ")";
    for (const companionId of companionList) {
      r = r + ", " + companionId;
      if (nobleCompanions.indexOf(companionId) !== -1) {
        noblesCount += 1;
      }
    }
    r = r + " (Nobles: " + noblesCount + ") " + "\n";
  }
  return r;
}

export function stringifyCompositions(nobleLordBasedCompositions: NobleLordBasedCompositions) {
  let r = "";
  for (const nobleLordBasedComposition of nobleLordBasedCompositions) {
    r = r + "{\n";
    for (const [key, companionSubsets] of
      Object.entries(nobleLordBasedComposition as NobleLordBasedComposition)) {
      if (Array.isArray(companionSubsets)) {
        r = r + "\t" + key + ": {\n";
        for (const companionList of companionSubsets) {
          let noblesCount = 0;
          r = r + "\t\t(" + companionList.length + ")";
          for (const companionId of companionList) {
            r = r + ", " + companionId;
            if (nobleCompanions.indexOf(companionId) !== -1) {
              noblesCount += 1;
            }
          }
          r = r + " (Nobles: " + noblesCount + ") " + "\n";
        }
        r = r + "\t}\n";
      } else {
        r = r + `\t${key}: ${nobleLordBasedComposition[key]}\n`;
      }
    }
    r = r + "}\n";
  }
  return r;
}

export function stringifyResults(resultCompositions: ResultCompositions) {
  let r = "";
  for (const resultComposition of resultCompositions) {
    r = r + "{\n";
    for (const [key, companionList] of
      Object.entries(resultComposition as ResultComposition)) {
      if (Array.isArray(companionList)) {
        let noblesCount = 0;
        r = r + "\t" + key + ": (" + companionList.length + ")";
        for (const companionId of companionList) {
          r = r + ", " + companionId;
          if (nobleCompanions.indexOf(companionId) !== -1) {
            noblesCount += 1;
          }
        }
        r = r + " (Nobles: " + noblesCount + ") " + "\n";
      } else {
        r = r + `\t${key}: ${companionList}\n`;
      }
    }
    r = r + "}\n";
  }
  return r;
}

export async function write(filePath: string, fileContent: string) {
  try {
    await fsPromises.mkdir(dirname(filePath), {recursive: true});
    await fsPromises.writeFile(filePath, fileContent, 'utf-8');
  } catch (err) {
    console.error(err);
  }
}
