import {initializeRaceState} from "../../src/domain/car.js";
import {INITIAL_DISTANCE} from "../../src/constants/config.js";

describe('initializeRaceState', () => {
  test('자동차들을 초기 거리 상태로 초기화한다', () => {
    const cars = ['pobi', 'woni', 'jun'];
    const result = initializeRaceState(cars);

    expect(result).toEqual([
      ['pobi', INITIAL_DISTANCE],
      ['woni', INITIAL_DISTANCE],
      ['jun', INITIAL_DISTANCE]
    ]);
  });

  test('빈 배열을 입력하면 빈 배열을 반환한다', () => {
    const result = initializeRaceState([]);
    expect(result).toEqual([]);
  });

  test('자동차 1대만 있어도 정상 작동한다', () => {
    const cars = ['pobi'];
    const result = initializeRaceState(cars);

    expect(result).toEqual([['pobi', INITIAL_DISTANCE]]);
  });
});