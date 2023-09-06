import {getAllSubsets} from "./util.js";
import {CompanionSubsets} from "./types/companion-id.type";
import {Companions} from "./types/companion.type";

export function getCompanionSafeSubsets(companions: Companions, minLength: number): CompanionSubsets {
  const safeCompanionSubsets: CompanionSubsets = []
  const companionSubsets = getAllSubsets(Object.keys(companions), minLength);

  for (const companionSubset of companionSubsets) {
    let allow = true;
    for (const companionId of companionSubset) {
      const companion = companions[companionId];
      let dislikes = 0;
      let likes = 0;
      if (companionSubset.findIndex((id) => id === companion.DISLIKES1) !== -1) {
        dislikes += 1;
      }

      if (companionSubset.findIndex((id) => id === companion.DISLIKES2) !== -1) {
        dislikes += 1;
      }

      if (companionSubset.findIndex((id) => id === companion.LIKES) !== -1) {
        likes += 1;
      }

      if (dislikes > likes) {
        allow = false;
        break;
      }
    }
    if (allow) {
      safeCompanionSubsets.push(companionSubset);
    }
  }

  return safeCompanionSubsets;
}
