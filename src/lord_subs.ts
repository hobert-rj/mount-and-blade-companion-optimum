import {getAllSubsets} from "./util.js";
import {INobleLordBasedComposition, NobleLordBasedCompositions} from "./types/noble-lord-based-compositions.type";
import {CompanionSubsets} from "./types/companion-id.type";

export function getSafeNobleLordCompositions(safeCompanionSubsets: CompanionSubsets, nobleLords: string[], minLength: number): NobleLordBasedCompositions {
  const nobleLordCompositions: NobleLordBasedCompositions = [];
  const nobleLordSubsets = getAllSubsets(nobleLords, minLength);

  for (const nobleLordList of nobleLordSubsets) {
    const nobleLordBasedComposition: INobleLordBasedComposition = {
      lords: [nobleLordList],
      withLord: [],
      noLord: [],
    };

    for (const safeCompanionList of safeCompanionSubsets) {
      let allLord = true;
      let noLord = true;
      for (const nobleLordId of nobleLordList) {
        const nobleLordIndex = safeCompanionList.indexOf(nobleLordId);
        allLord = allLord && nobleLordIndex !== -1;
        noLord = noLord && nobleLordIndex === -1;
      }

      if (allLord) {
        nobleLordBasedComposition.withLord.push(safeCompanionList);
      }

      if (noLord) {
        nobleLordBasedComposition.noLord.push(safeCompanionList);
      }
    }

    nobleLordCompositions.push(nobleLordBasedComposition);
  }

  return nobleLordCompositions;
}
