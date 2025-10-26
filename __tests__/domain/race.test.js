import {moveCar, playAllRounds, playOneRound} from "../../src/domain/race.js";
import {INITIAL_DISTANCE, MOVE_INCREMENT} from "../../src/constants/config.js";

describe('moveCar', () => {
  test('자동차 이름과 거리를 입력하면 [이름, 새로운거리] 배열을 반환한다', () => {
    const result = moveCar('pobi', 0);

    expect(Array.isArray(result)).toBe(true);
    expect(result[0]).toBe('pobi');
    expect(typeof result[1]).toBe('number');
  });

  test('거리는 현재 거리 또는 현재거리 + MOVE_INCREMENT여야 한다', () => {
    const currentDistance = 3;
    const result = moveCar('pobi', currentDistance);

    expect([currentDistance, currentDistance + MOVE_INCREMENT]).toContain(result[1]);
  });
});

describe('playOneRound', () => {
  test('이전 라운드 상태를 입력하면 각 자동차가 이동한 새로운 상태를 반환한다', () => {
    const previousRoundState = [
      ['pobi', 0],
      ['woni', 0],
      ['jun', 0]
    ];

    const result = playOneRound(previousRoundState);

    expect(result.length).toBe(3);
    expect(result[0][0]).toBe('pobi');
    expect(result[1][0]).toBe('woni');
    expect(result[2][0]).toBe('jun');
  });

  test('모든 자동차의 거리가 증가하거나 유지된다', () => {
    const previousRoundState = [
      ['pobi', 2],
      ['woni', 3]
    ];

    const result = playOneRound(previousRoundState);

    expect(result[0][1]).toBeGreaterThanOrEqual(2);
    expect(result[1][1]).toBeGreaterThanOrEqual(3);
  });
});

describe('playAllRounds', () => {
  test('지정된 라운드 수만큼 경주를 진행한다', () => {
    const initialState = [
      ['pobi', INITIAL_DISTANCE],
      ['woni', INITIAL_DISTANCE]
    ];

    const result = playAllRounds(initialState, 3);

    expect(result.length).toBe(3);
  });

  test('각 라운드의 상태가 기록된다', () => {
    const initialState = [['pobi', INITIAL_DISTANCE]];

    const result = playAllRounds(initialState, 2);

    expect(result[0][0][0]).toBe('pobi');
    expect(result[1][0][0]).toBe('pobi');
  });

  test('각 라운드마다 거리가 증가하거나 유지된다', () => {
    const initialState = [['pobi', INITIAL_DISTANCE]];

    const result = playAllRounds(initialState, 3);

    expect(result[0][0][1]).toBeGreaterThanOrEqual(INITIAL_DISTANCE);
    expect(result[1][0][1]).toBeGreaterThanOrEqual(result[0][0][1]);
    expect(result[2][0][1]).toBeGreaterThanOrEqual(result[1][0][1]);
  });
});