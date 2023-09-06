export function AnalyzeSortCompanionSafeSubsLordSubs(SafeSubsLordSub) {
  const finalResult = [];

  for (let sub of SafeSubsLordSub) {
    for (let withLord of sub.withLord) {
      for (let noLord of sub.noLord) {
        const persistent = withLord.filter((el) => noLord.indexOf(el) !== -1),
          score =
            sub.lords[0].length * 2 + persistent.length + noLord.length * 2;
        if (score > 34) {
          finalResult.push({
            lords: sub.lords[0],
            persistent: persistent,
            phase2: noLord.filter((el) => persistent.indexOf(el) === -1),
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
