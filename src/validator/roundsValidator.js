import {MAX_ROUNDS, MIN_ROUNDS} from "../constants/config.js";
import {ERROR_MESSAGES} from "../constants/errorMessages.js";

export const validateRoundsNotEmpty = (trimmedRounds) => {
  if (trimmedRounds.length === 0) throw new Error(ERROR_MESSAGES.ROUNDS_EMPTY);
};

export const validateRoundsIsNumber = (parsedRounds) => {
  if (isNaN(parsedRounds)) throw new Error(ERROR_MESSAGES.ROUNDS_NOT_NUMBER);
};

export const validateRoundsIsInteger = (parsedRounds) => {
  if (!Number.isInteger(parsedRounds)) throw new Error(ERROR_MESSAGES.ROUNDS_NOT_INTEGER);
};

export const validateRoundsInRange = (parsedRounds) => {
  if (parsedRounds < MIN_ROUNDS || parsedRounds > MAX_ROUNDS) throw new Error(ERROR_MESSAGES.ROUNDS_OUT_OF_RANGE);
};

export const validateRounds = (rounds) => {
  const trimmedRounds = rounds.trim();

  validateRoundsNotEmpty(trimmedRounds);

  const parsedRounds = Number(trimmedRounds);

  validateRoundsIsNumber(parsedRounds);
  validateRoundsIsInteger(parsedRounds);
  validateRoundsInRange(parsedRounds);

  return parsedRounds;
};