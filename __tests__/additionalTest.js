import App from "../src/App.js";
import { MissionUtils } from "@woowacourse/mission-utils";

const mockQuestions = (inputs) => {
  MissionUtils.Console.readLineAsync = jest.fn();
  MissionUtils.Console.readLineAsync.mockImplementation(() => {
    const input = inputs.shift();
    return Promise.resolve(input);
  });
};

const mockRandoms = (numbers) => {
  MissionUtils.Random.pickNumberInRange = jest.fn();
  numbers.reduce((acc, number) => {
    return acc.mockReturnValueOnce(number);
  }, MissionUtils.Random.pickNumberInRange);
};

const getLogSpy = () => {
  const logSpy = jest.spyOn(MissionUtils.Console, "print");
  logSpy.mockClear();
  return logSpy;
};

const testCases = [
  // 1대 자동차 - 기본
  { cars: "pobi", chance: "1", randoms: [4], expected: "최종 우승자 : pobi", shouldError: false },
  { cars: "pobi", chance: "1", randoms: [3], expected: "pobi :", shouldError: false },

  // 2대 자동차 - 우승자 1명
  { cars: "pobi,woni", chance: "1", randoms: [4, 3], expected: "최종 우승자 : pobi", shouldError: false },

  // 2대 자동차 - 공동 우승
  { cars: "pobi,woni", chance: "1", randoms: [4, 4], expected: "최종 우승자 : pobi, woni", shouldError: false },

  // 3대 자동차 - 모두 공동 우승
  { cars: "pobi,woni,jun", chance: "1", randoms: [4, 4, 4], expected: "최종 우승자 : pobi, woni, jun", shouldError: false },

  // 3대 자동차 - 일부 우승
  { cars: "pobi,woni,jun", chance: "1", randoms: [4, 3, 4], expected: "최종 우승자 : pobi, jun", shouldError: false },

  // 2라운드 누적 계산
  { cars: "pobi,woni", chance: "2", randoms: [4, 3, 3, 4], expected: "최종 우승자 : pobi, woni", shouldError: false },

  // 3라운드 누적 계산 - 명확한 우승자
  { cars: "pobi,woni", chance: "3", randoms: [4, 3, 4, 3, 3, 4], expected: "최종 우승자 : pobi", shouldError: false },

  // 공백 처리
  { cars: " pobi , woni ", chance: "1", randoms: [4, 4], expected: "최종 우승자 : pobi, woni", shouldError: false },

  // 자동차 이름 5글자 최대
  { cars: "abcde,fghij", chance: "1", randoms: [4, 4], expected: "최종 우승자 : abcde, fghij", shouldError: false },

  // 예외 - 자동차 이름 6글자 초과
  { cars: "toolongname", chance: "1", randoms: [], expected: null, shouldError: true },

  // 예외 - 자동차 이름 공백
  { cars: "pobi,,woni", chance: "1", randoms: [], expected: null, shouldError: true },

  // 예외 - 자동차 입력 없음
  { cars: "", chance: "1", randoms: [], expected: null, shouldError: true },

  // 예외 - 시도 횟수 0
  { cars: "pobi,woni", chance: "0", randoms: [], expected: null, shouldError: true },

  // 예외 - 시도 횟수 음수
  { cars: "pobi,woni", chance: "-5", randoms: [], expected: null, shouldError: true },

  // 예외 - 시도 횟수 소수점
  { cars: "pobi,woni", chance: "3.5", randoms: [], expected: null, shouldError: true },

  // 예외 - 시도 횟수 문자
  { cars: "pobi,woni", chance: "abc", randoms: [], expected: null, shouldError: true },

  // 예외 - 시도 횟수 공백 포함
  { cars: "pobi,woni", chance: "5 0", randoms: [], expected: null, shouldError: true },

  // 랜덤값 경계 - 정지(3)
  { cars: "a,b", chance: "1", randoms: [3, 3], expected: "최종 우승자 : a, b", shouldError: false },

  // 랜덤값 경계 - 전진(4)
  { cars: "a,b", chance: "1", randoms: [4, 4], expected: "최종 우승자 : a, b", shouldError: false },
];

export const additionalTests = () => {
  describe("자동차 경주 게임", () => {
    testCases.forEach(({ cars, chance, randoms, expected, shouldError }, index) => {
      const testName = `테스트 ${index + 1}: 자동차="${cars}" 횟수="${chance}" ${shouldError ? "예외" : `→ ${expected}`}`;

      test(testName, async () => {
        mockQuestions([cars, chance]);

        if (shouldError) {
          const app = new App();
          await expect(app.run()).rejects.toThrow("[ERROR]");
        } else {
          mockRandoms(randoms);
          const logSpy = getLogSpy();
          const app = new App();
          await app.run();
          expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(expected));
        }
      });
    });
  });
};

additionalTests();