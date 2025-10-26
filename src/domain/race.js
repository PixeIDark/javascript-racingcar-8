import {MissionUtils} from "@woowacourse/mission-utils";
import {MOVE_CONDITION, MOVE_INCREMENT, RANDOM_RANGE_MAX, RANDOM_RANGE_MIN} from "../constants/config.js";

export const moveCar = (carName, distance) => {
  const value = MissionUtils.Random.pickNumberInRange(RANDOM_RANGE_MIN, RANDOM_RANGE_MAX);
  let newDistance = distance;

  if (value >= MOVE_CONDITION) newDistance += MOVE_INCREMENT;

  return [carName, newDistance];
};

export const playOneRound = (previousRoundState) => {
  return previousRoundState.map(([carName, distance]) => moveCar(carName, distance));
};

export const playAllRounds = (initialState, rounds) => {
  const allRoundsState = [];
  let currentRoundState = initialState.slice();

  for (let i = 0; i < rounds; i++) {
    currentRoundState = playOneRound(currentRoundState);

    allRoundsState.push(currentRoundState);
  }

  return allRoundsState;
};