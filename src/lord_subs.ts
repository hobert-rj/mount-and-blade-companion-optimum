import { GetAllSubsets } from "./util.js";

export function GetCompanionSafeSubsLordSubs(SafeSubs, LordsList, minLength) {
  const safeSubsLordSub = [],
    lordSubsets = GetAllSubsets(LordsList, minLength);

  for (let lordSub of lordSubsets) {
    const r = {
      lords: [lordSub],
      withLord: [],
      noLord: [],
    };

    for (let sub of SafeSubs) {
      let allLord = true,
        noLord = true;
      for (let lord of lordSub) {
        const index = sub.indexOf(lord);
        allLord = allLord && index !== -1;
        noLord = noLord && index === -1;
      }

      if (allLord) {
        r.withLord.push(sub);
      }

      if (noLord) {
        r.noLord.push(sub);
      }
    }

    safeSubsLordSub.push(r);
  }

  return safeSubsLordSub;
}
