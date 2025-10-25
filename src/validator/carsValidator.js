import { MAX_CAR_NAME_LENGTH, MIN_CAR_NAME_LENGTH } from "../constants/config.js";
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

export const validateCars = (cars) => {
  const trimmedCars = cars.trim();

  validateCarsNotEmpty(trimmedCars);

  for(const car of trimmedCars.split(",")) {
    const carName = car.trim();
    validateCarNameMinLength(carName);
    validateCarNameMaxLength(carName);
  }

  return trimmedCars;
};