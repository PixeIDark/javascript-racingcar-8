import {MAX_ROUNDS, MIN_ROUNDS} from "./config.js";

export const ERROR_MESSAGES = {
  CARS_EMPTY: "[ERROR] 경주할 자동차가 없습니다.",
  CAR_NAME_TOO_SHORT: "[ERROR] 자동차 이름은 1자 이상이어야 합니다.",
  CAR_NAME_TOO_LONG: "[ERROR] 자동차 이름은 5자 이하여야 합니다.",
  ROUNDS_EMPTY: "[ERROR] 시도할 횟수를 입력하세요.",
  ROUNDS_NOT_NUMBER: "[ERROR] 시도할 횟수는 숫자여야 합니다.",
  ROUNDS_NOT_INTEGER: "[ERROR] 시도할 횟수는 정수여야 합니다.",
  ROUNDS_OUT_OF_RANGE: `[ERROR] 시도할 횟수는 ${MIN_ROUNDS}회 이상 ${MAX_ROUNDS}회 이하여야 합니다.`,
};