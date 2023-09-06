import {NobleLordBasedCompositions} from "./types/noble-lord-based-compositions.type";
import {minimumScore} from "./constants";
import {ResultCompositions} from "./types/result-composiotion.type";

export function analyzeSortCompanions(
  nobleLordBasedCompositions: NobleLordBasedCompositions
): ResultCompositions {
  const finalResult: ResultCompositions = [];

  for (const nobleLordBasedComposition of nobleLordBasedCompositions) {
    for (const withLordCompanionList of nobleLordBasedComposition.withLord) {
      for (const noLordCompanionList of nobleLordBasedComposition.noLord) {
        const persistent = withLordCompanionList.filter((id) =>
          noLordCompanionList.indexOf(id) !== -1);
        const score = nobleLordBasedComposition.lords[0].length * 2
          + persistent.length + noLordCompanionList.length * 2;
        if (score > minimumScore) {
          finalResult.push({
            lords: nobleLordBasedComposition.lords[0],
            persistent: persistent,
            phase2: noLordCompanionList.filter((id) => persistent.indexOf(id) === -1),
            score,
          });
        }
      }
    }
  }

  return finalResult.sort(function (a, b) {
    return b.score - a.score;
  });
}
