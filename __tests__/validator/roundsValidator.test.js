import {
  validateRoundsNotEmpty,
  validateRoundsIsNumber,
  validateRoundsIsInteger,
  validateRoundsInRange,
  validateRounds
} from "../../src/validator/roundsValidator.js";
import { MIN_ROUNDS, MAX_ROUNDS } from "../../src/constants/config.js";
import { ERROR_MESSAGES } from "../../src/constants/errorMessages.js";

describe('validateRoundsNotEmpty', () => {
  test('빈 문자열이 아니면 통과한다', () => {
    const validInputs = ['1', '100', '5'];
    validInputs.forEach((input) => {
      expect(() => validateRoundsNotEmpty(input)).not.toThrow();
    });
  });

  test('빈 문자열이면 에러를 던진다', () => {
    expect(() => validateRoundsNotEmpty("")).toThrow(ERROR_MESSAGES.ROUNDS_EMPTY);
  });
});

describe('validateRoundsIsNumber', () => {
  test('유효한 숫자는 통과한다', () => {
    const validNumbers = [1, 5, 100, 1e9];
    validNumbers.forEach((num) => {
      expect(() => validateRoundsIsNumber(num)).not.toThrow();
    });
  });

  test('NaN이면 에러를 던진다', () => {
    expect(() => validateRoundsIsNumber(NaN)).toThrow(ERROR_MESSAGES.ROUNDS_NOT_NUMBER);
  });

  test('숫자가 아니면 에러를 던진다', () => {
    expect(() => validateRoundsIsNumber(undefined)).toThrow(ERROR_MESSAGES.ROUNDS_NOT_NUMBER);
  });
});

describe('validateRoundsIsInteger', () => {
  test('정수는 통과한다', () => {
    const validIntegers = [1, 5, 100, 1000];
    validIntegers.forEach((num) => {
      expect(() => validateRoundsIsInteger(num)).not.toThrow();
    });
  });

  test('소수점은 에러를 던진다', () => {
    const invalidInputs = [1.5, 5.5, 10.1];
    invalidInputs.forEach((num) => {
      expect(() => validateRoundsIsInteger(num)).toThrow(ERROR_MESSAGES.ROUNDS_NOT_INTEGER);
    });
  });
});

describe('validateRoundsInRange', () => {
  test(`${MIN_ROUNDS}회 이상 ${MAX_ROUNDS}회 이하의 횟수를 허용한다`, () => {
    const validRounds = [1, 5, 100, 1000];
    validRounds.forEach((num) => {
      expect(() => validateRoundsInRange(num)).not.toThrow();
    });
  });

  test(`${MIN_ROUNDS}회 미만이면 에러를 던진다`, () => {
    expect(() => validateRoundsInRange(0)).toThrow(ERROR_MESSAGES.ROUNDS_OUT_OF_RANGE);
  });

  test(`${MAX_ROUNDS}회를 초과하면 에러를 던진다`, () => {
    expect(() => validateRoundsInRange(MAX_ROUNDS + 1)).toThrow(ERROR_MESSAGES.ROUNDS_OUT_OF_RANGE);
  });
});

describe('validateRounds', () => {
  describe('validateRoundsNotEmpty 검증', () => {
    test('빈 문자열이면 에러를 던진다', () => {
      expect(() => validateRounds("")).toThrow(ERROR_MESSAGES.ROUNDS_EMPTY);
    });

    test('공백만 있으면 에러를 던진다', () => {
      expect(() => validateRounds("   ")).toThrow(ERROR_MESSAGES.ROUNDS_EMPTY);
    });
  });

  describe('validateRoundsIsNumber 검증', () => {
    test('숫자가 아니면 에러를 던진다', () => {
      expect(() => validateRounds("abc")).toThrow(ERROR_MESSAGES.ROUNDS_NOT_NUMBER);
    });
  });

  describe('validateRoundsIsInteger 검증', () => {
    test('소수점이 있으면 에러를 던진다', () => {
      expect(() => validateRounds("5.5")).toThrow(ERROR_MESSAGES.ROUNDS_NOT_INTEGER);
    });
  });

  describe('validateRoundsInRange 검증', () => {
    test(`${MIN_ROUNDS}회 미만이면 에러를 던진다`, () => {
      expect(() => validateRounds("0")).toThrow(ERROR_MESSAGES.ROUNDS_OUT_OF_RANGE);
    });

    test(`${MAX_ROUNDS}회를 초과하면 에러를 던진다`, () => {
      expect(() => validateRounds(String(MAX_ROUNDS + 1))).toThrow(ERROR_MESSAGES.ROUNDS_OUT_OF_RANGE);
    });
  });

  describe('정상 입력', () => {
    test('유효한 횟수를 입력하면 parsedRounds를 반환한다', () => {
      const result = validateRounds('5');
      expect(result).toBe(5);
    });

    test('공백을 제거한 상태로 반환한다', () => {
      const result = validateRounds('  10  ');
      expect(result).toBe(10);
    });

    test('최소값을 입력하면 반환한다', () => {
      const result = validateRounds(String(MIN_ROUNDS));
      expect(result).toBe(MIN_ROUNDS);
    });

    test('큰 수도 통과한다', () => {
      const result = validateRounds('1000');
      expect(result).toBe(1000);
    });
  });
});