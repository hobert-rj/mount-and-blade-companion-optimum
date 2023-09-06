import { GetAllSubsets } from "./util.js";

export function GetCompanionSafeSub(CompanionList, minLength) {
  const safeSubs = [],
    herosSubsets = GetAllSubsets(Object.keys(CompanionList), minLength);

  for (let sub of herosSubsets) {
    let allow = true;
    for (let hero of sub) {
      let heroObj = CompanionList[hero];
      let dislikes = 0,
        likes = 0;
      if (sub.findIndex((el) => el === heroObj.DISLIKES1) !== -1) {
        dislikes += 1;
      }

      if (sub.findIndex((el) => el === heroObj.DISLIKES2) !== -1) {
        dislikes += 1;
      }

      if (sub.findIndex((el) => el === heroObj.LIKES) !== -1) {
        likes += 1;
      }

      if (dislikes > likes) {
        allow = false;
        break;
      }
    }
    if (allow) {
      safeSubs.push(sub);
    }
  }

  return safeSubs;
}
