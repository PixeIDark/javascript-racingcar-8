import {
  MAX_CAR_COUNT,
  MAX_CAR_NAME_LENGTH,
  MAX_ROUNDS,
  MIN_CAR_COUNT,
  MIN_CAR_NAME_LENGTH,
  MIN_ROUNDS,
} from "./config.js";

export const ERROR_MESSAGES = {
  CARS_EMPTY: "[ERROR] 경주할 자동차가 없습니다.",
  CAR_NAME_TOO_SHORT: `[ERROR] 자동차 이름은 ${MIN_CAR_NAME_LENGTH}자 이상이어야 합니다.`,
  CAR_NAME_TOO_LONG: `[ERROR] 자동차 이름은 ${MAX_CAR_NAME_LENGTH}자 이하여야 합니다.`,
  CAR_NAME_DUPLICATED: "[ERROR] 중복된 자동차 이름이 있습니다.",
  CAR_COUNT_OUT_OF_RANGE: `[ERROR] 자동차는 ${MIN_CAR_COUNT}대 이상 ${MAX_CAR_COUNT}대 이하여야 합니다.`,
  ROUNDS_EMPTY: "[ERROR] 시도할 횟수를 입력하세요.",
  ROUNDS_NOT_NUMBER: "[ERROR] 시도할 횟수는 숫자여야 합니다.",
  ROUNDS_NOT_INTEGER: "[ERROR] 시도할 횟수는 정수여야 합니다.",
  ROUNDS_OUT_OF_RANGE: `[ERROR] 시도할 횟수는 ${MIN_ROUNDS}회 이상 ${MAX_ROUNDS}회 이하여야 합니다.`,
};