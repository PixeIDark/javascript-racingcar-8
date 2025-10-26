import {printRaceResult, printRaceRound} from "../../src/ui/output.js";
import {MissionUtils} from "@woowacourse/mission-utils";
import {OUTPUT_MESSAGES} from "../../src/constants/outputMessages.js";

jest.mock("@woowacourse/mission-utils");

describe("printRaceRound", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("포맷된 라운드의 각 자동차와 거리를 출력한다", () => {
    const formattedRound = [
      ["pobi", "---"],
      ["woni", "--"],
    ];

    printRaceRound(formattedRound);

    expect(MissionUtils.Console.print).toHaveBeenCalledWith("pobi : ---");
    expect(MissionUtils.Console.print).toHaveBeenCalledWith("woni : --");
  });

  test("라운드 출력 후 빈 줄을 출력한다", () => {
    const formattedRound = [["pobi", "-"]];

    printRaceRound(formattedRound);

    const calls = MissionUtils.Console.print.mock.calls;
    expect(calls[calls.length - 1][0]).toBe("");
  });

  test("여러 자동차를 올바른 순서로 출력한다", () => {
    const formattedRound = [
      ["pobi", "----"],
      ["woni", "---"],
      ["jun", "----"],
    ];

    printRaceRound(formattedRound);

    const calls = MissionUtils.Console.print.mock.calls;
    expect(calls[0][0]).toBe("pobi : ----");
    expect(calls[1][0]).toBe("woni : ---");
    expect(calls[2][0]).toBe("jun : ----");
  });

  test("빈 라운드를 입력하면 빈 줄만 출력한다", () => {
    const formattedRound = [];

    printRaceRound(formattedRound);

    expect(MissionUtils.Console.print).toHaveBeenCalledWith("");
  });
});

describe("printRaceResult", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("실행 결과 헤더를 출력한다", () => {
    const winnersString = "pobi";
    const dashRaceHistory = [
      [["pobi", "-"], ["woni", ""]],
    ];

    printRaceResult(winnersString, dashRaceHistory);

    const calls = MissionUtils.Console.print.mock.calls;
    expect(calls).toEqual(
      expect.arrayContaining([
        expect.arrayContaining([OUTPUT_MESSAGES.RACE_RESULT]),
      ]),
    );
  });

  test("각 라운드 결과를 출력한다", () => {
    const winnersString = "pobi";
    const dashRaceHistory = [
      [["pobi", "-"], ["woni", ""]],
      [["pobi", "--"], ["woni", "-"]],
    ];

    printRaceResult(winnersString, dashRaceHistory);

    const calls = MissionUtils.Console.print.mock.calls;
    expect(calls).toEqual(
      expect.arrayContaining([
        expect.arrayContaining(["pobi : -"]),
        expect.arrayContaining(["woni : "]),
        expect.arrayContaining(["pobi : --"]),
      ]),
    );
  });

  test("최종 우승자를 출력한다", () => {
    const winnersString = "pobi";
    const dashRaceHistory = [
      [["pobi", "-"], ["woni", ""]],
    ];

    printRaceResult(winnersString, dashRaceHistory);

    const calls = MissionUtils.Console.print.mock.calls;
    const lastCall = calls[calls.length - 1][0];
    expect(lastCall).toBe(OUTPUT_MESSAGES.WINNER("pobi"));
  });

  test("공동 우승자를 출력한다", () => {
    const winnersString = "pobi, jun";
    const dashRaceHistory = [
      [["pobi", "-"], ["jun", "-"], ["woni", ""]],
    ];

    printRaceResult(winnersString, dashRaceHistory);

    const calls = MissionUtils.Console.print.mock.calls;
    const lastCall = calls[calls.length - 1][0];
    expect(lastCall).toBe(OUTPUT_MESSAGES.WINNER("pobi, jun"));
  });

  test("여러 라운드를 모두 출력한다", () => {
    const winnersString = "pobi";
    const dashRaceHistory = [
      [["pobi", "-"], ["woni", ""]],
      [["pobi", "--"], ["woni", "-"]],
      [["pobi", "---"], ["woni", "--"]],
    ];

    printRaceResult(winnersString, dashRaceHistory);

    const calls = MissionUtils.Console.print.mock.calls;
    expect(calls.length).toBeGreaterThan(5);
  });
});