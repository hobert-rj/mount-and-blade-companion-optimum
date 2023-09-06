import { Heroes, Nobles } from "./heros.js";
import { GetCompanionSafeSub } from "./safe_subs.js";
import { GetCompanionSafeSubsLordSubs } from "./lord_subs.js";
import { Stringify, Write } from "./util.js";
import { AnalyzeSortCompanionSafeSubsLordSubs } from "./analyze_subs.js";

const safeSubs = GetCompanionSafeSub(Heroes, 7),
  lords = Nobles.filter((el) => el !== "Lezalit");

Write("./result/floris_companion.txt", Stringify(safeSubs));

{
  const safeSubsLordSub = GetCompanionSafeSubsLordSubs(safeSubs, lords, 5);

  {
    const stringify2 = (arr) => {
      let r = "";
      for (let sub of arr) {
        r = r + "{\n";
        for (let key of Object.keys(sub)) {
          if (Array.isArray(sub[key])) {
            r = r + "\t" + key + ": {\n";
            for (let heroSub of sub[key]) {
              let nobles_count = 0;
              r = r + "\t\t(" + heroSub.length + ")";
              for (let hero of heroSub) {
                r = r + ", " + hero;
                if (Nobles.indexOf(hero) !== -1) {
                  nobles_count += 1;
                }
              }
              r = r + " (Nobles: " + nobles_count + ") " + "\n";
            }
            r = r + "\t}\n";
          } else {
            r = r + `\t${key}: ${sub[key]}\n`;
          }
        }
        r = r + "}\n";
      }
      return r;
    };

    Write("./result/safe_subs_lord_sub.txt", stringify2(safeSubsLordSub));
  }

  {
    const finalResult = AnalyzeSortCompanionSafeSubsLordSubs(safeSubsLordSub);

    const stringify2 = (arr) => {
      let r = "";
      for (let sub of arr) {
        r = r + "{\n";
        for (let key of Object.keys(sub)) {
          if (Array.isArray(sub[key])) {
            let nobles_count = 0;
            r = r + "\t" + key + ": (" + sub[key].length + ")";
            for (let hero of sub[key]) {
              r = r + ", " + hero;
              if (Nobles.indexOf(hero) !== -1) {
                nobles_count += 1;
              }
            }
            r = r + " (Nobles: " + nobles_count + ") " + "\n";
          } else {
            r = r + `\t${key}: ${sub[key]}\n`;
          }
        }
        r = r + "}\n";
      }
      return r;
    };

    Write("./result/final_result.txt", stringify2(finalResult));
  }
}
