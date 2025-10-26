export const convertDistanceToDashes = (round) => {
  return round.map(([car, distance]) => [car, "-".repeat(distance)]);
};

export const formatRaceHistory = (raceHistory) => {
  return raceHistory.map(convertDistanceToDashes);
};