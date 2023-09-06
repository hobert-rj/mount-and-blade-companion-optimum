import {companions, nobleCompanions} from "./companions";
import {excludeNobles} from "./constants";
import {getCompanionSafeSubsets} from "./safe_subs.js";
import {getSafeNobleLordCompositions} from "./lord_subs.js";
import {stringifyCompositions, stringifyResults, stringifySubsets, write} from "./util.js";
import {analyzeSortCompanions} from "./analyze_subs.js";
import {NobleLordBasedCompositions} from "./types/noble-lord-based-compositions.type";

export async function companionJs() {
  let safeNobleLordCompositions: NobleLordBasedCompositions;

  {
    const safeSubsets = getCompanionSafeSubsets(companions, 7);
    const nobleLordsId = nobleCompanions.filter((noble) => !excludeNobles.includes(noble));

    await write("./result/floris_companion.txt", stringifySubsets(safeSubsets));

    safeNobleLordCompositions = getSafeNobleLordCompositions(safeSubsets, nobleLordsId, 5);
  }

  await write("./result/safe_subs_lord_sub.txt", stringifyCompositions(safeNobleLordCompositions));

  const resultCompositions = analyzeSortCompanions(safeNobleLordCompositions);

  await write("./result/final_result.txt", stringifyResults(resultCompositions));
}

companionJs();
