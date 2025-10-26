export const getMaxDistance = (round) => {
  return Math.max(...round.map(([_, distance]) => distance));
};

export const getWinners = (finalRound) => {
  const maxDistance = getMaxDistance(finalRound);

  return finalRound
    .filter(([_, distance]) => distance === maxDistance)
    .map(([car, _]) => car);
};