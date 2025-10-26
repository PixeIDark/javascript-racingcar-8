import {convertDistanceToDashes, formatRaceHistory} from "../../src/formatter/raceFormatter.js";

describe("formatRound", () => {
  test("자동차와 거리를 자동차와 대시 문자열로 변환한다", () => {
    const round = [
      ["pobi", 3],
      ["woni", 2],
    ];

    const result = convertDistanceToDashes(round);

    expect(result).toEqual([
      ["pobi", "---"],
      ["woni", "--"],
    ]);
  });

  test("거리가 0이면 빈 문자열을 반환한다", () => {
    const round = [["pobi", 0]];

    const result = convertDistanceToDashes(round);

    expect(result).toEqual([["pobi", ""]]);
  });

  test("빈 배열을 입력하면 빈 배열을 반환한다", () => {
    const result = convertDistanceToDashes([]);
    expect(result).toEqual([]);
  });
});

describe("formatRaceHistory", () => {
  test("경주 히스토리의 모든 라운드를 포맷팅한다", () => {
    const raceHistory = [
      [["pobi", 1], ["woni", 0]],
      [["pobi", 2], ["woni", 1]],
    ];

    const result = formatRaceHistory(raceHistory);

    expect(result).toEqual([
      [["pobi", "-"], ["woni", ""]],
      [["pobi", "--"], ["woni", "-"]],
    ]);
  });

  test("빈 배열을 입력하면 빈 배열을 반환한다", () => {
    const result = formatRaceHistory([]);
    expect(result).toEqual([]);
  });
});