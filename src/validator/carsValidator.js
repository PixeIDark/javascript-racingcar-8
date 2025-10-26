import {MAX_CAR_COUNT, MAX_CAR_NAME_LENGTH, MIN_CAR_COUNT, MIN_CAR_NAME_LENGTH} from "../constants/config.js";
import { ERROR_MESSAGES } from "../constants/errorMessages.js";

export const validateCarsNotEmpty = (trimmedCars) => {
  if(trimmedCars.length === 0) throw new Error(ERROR_MESSAGES.CARS_EMPTY);
};

export const validateCarNameMinLength = (carName) => {
  if(carName.length < MIN_CAR_NAME_LENGTH) throw new Error(ERROR_MESSAGES.CAR_NAME_TOO_SHORT);
};

export const validateCarNameMaxLength = (carName) => {
  if(carName.length > MAX_CAR_NAME_LENGTH) throw new Error(ERROR_MESSAGES.CAR_NAME_TOO_LONG);
};

export const validateNoDuplicates = (carArray) => {
  const uniqueCars = [...new Set(carArray)];

  if (uniqueCars.length !== carArray.length) throw new Error(ERROR_MESSAGES.CAR_NAME_DUPLICATED);
};

export const validateCarCount = (carArray) => {
  if(carArray.length < MIN_CAR_COUNT || carArray.length > MAX_CAR_COUNT) throw new Error(ERROR_MESSAGES.CAR_COUNT_OUT_OF_RANGE);
};

export const validateCars = (cars) => {
  const trimmedCars = cars.trim();
  validateCarsNotEmpty(trimmedCars);

  const carArray = trimmedCars.split(",").map(car => car.trim());
  carArray.forEach(carName => {
    validateCarNameMinLength(carName);
    validateCarNameMaxLength(carName);
  });

  validateNoDuplicates(carArray);
  validateCarCount(carArray);

  return carArray;
};