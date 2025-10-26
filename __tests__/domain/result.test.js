import {getWinners} from "../../src/domain/result.js";

describe("getWinners", () => {
  test("최대 거리를 간 자동차들을 반환한다", () => {
    const finalRound = [
      ["pobi", 5],
      ["woni", 3],
      ["jun", 5],
    ];

    const result = getWinners(finalRound);

    expect(result).toContain("pobi");
    expect(result).toContain("jun");
    expect(result).not.toContain("woni");
  });

  test("단독 우승자만 있을 때 한 명을 반환한다", () => {
    const finalRound = [
      ["pobi", 5],
      ["woni", 3],
      ["jun", 2],
    ];

    const result = getWinners(finalRound);

    expect(result).toEqual(["pobi"]);
  });

  test("모든 자동차가 같은 거리일 때 모두를 반환한다", () => {
    const finalRound = [
      ["pobi", 5],
      ["woni", 5],
      ["jun", 5],
    ];

    const result = getWinners(finalRound);

    expect(result.length).toBe(3);
  });

  test("우승자들을 쉼표로 구분한 문자열로 만들 수 있다", () => {
    const finalRound = [
      ["pobi", 5],
      ["woni", 3],
      ["jun", 5],
    ];

    const winnersString = getWinners(finalRound).join(", ");

    expect(winnersString).toBe("pobi, jun");
  });

  test("단독 우승자를 쉼표로 구분한 문자열로 만들 수 있다", () => {
    const finalRound = [
      ["pobi", 5],
      ["woni", 3],
    ];

    const winnersString = getWinners(finalRound).join(", ");

    expect(winnersString).toBe("pobi");
  });

  test("모든 자동차가 우승자일 때 쉼표로 구분한 문자열로 만들 수 있다", () => {
    const finalRound = [
      ["pobi", 5],
      ["woni", 5],
      ["jun", 5],
    ];

    const winnersString = getWinners(finalRound).join(", ");

    expect(winnersString).toBe("pobi, woni, jun");
  });
});