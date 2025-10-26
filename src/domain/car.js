import {INITIAL_DISTANCE} from "../constants/config.js";

export const initializeRaceState = (cars) => {
  return cars.map(carName => [carName, INITIAL_DISTANCE]);
};