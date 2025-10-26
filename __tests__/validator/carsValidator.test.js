import {
  validateCarsNotEmpty,
  validateCarNameMinLength,
  validateCarNameMaxLength,
  validateNoDuplicates,
  validateCarCount,
  validateCars
} from "../../src/validator/carsValidator.js";
import { MAX_CAR_NAME_LENGTH, MIN_CAR_NAME_LENGTH, MAX_CAR_COUNT, MIN_CAR_COUNT } from "../../src/constants/config.js";
import { ERROR_MESSAGES } from "../../src/constants/errorMessages.js";

describe('validateCarsNotEmpty', () => {
  test('빈 문자열이 아니면 통과한다', () => {
    const validInputs = ['pobi', 'pobi,woni,jun', 'a'];
    validInputs.forEach((input) => {
      expect(() => validateCarsNotEmpty(input)).not.toThrow();
    });
  });

  test('빈 문자열이면 에러를 던진다', () => {
    expect(() => validateCarsNotEmpty("")).toThrow(ERROR_MESSAGES.CARS_EMPTY);
  });
});

describe('validateCarNameMinLength', () => {
  test(`${MIN_CAR_NAME_LENGTH}자 이상의 이름을 허용한다`, () => {
    const validNames = ['pobi', 'woni', 'a', 'aaaaa'];
    validNames.forEach((name) => {
      expect(() => validateCarNameMinLength(name)).not.toThrow();
    });
  });

  test(`${MIN_CAR_NAME_LENGTH}자 미만의 이름에 대해 에러를 발생시킨다`, () => {
    expect(() => validateCarNameMinLength("")).toThrow(ERROR_MESSAGES.CAR_NAME_TOO_SHORT);
  });
});

describe('validateCarNameMaxLength', () => {
  test(`${MAX_CAR_NAME_LENGTH}자 이하의 이름을 허용한다`, () => {
    const validNames = ['pobi', 'woni', 'a', 'aaaaa'];
    validNames.forEach((name) => {
      expect(() => validateCarNameMaxLength(name)).not.toThrow();
    });
  });

  test(`${MAX_CAR_NAME_LENGTH}자를 초과하는 이름에 대해 에러를 발생시킨다`, () => {
    const invalidNames = [
      'a'.repeat(MAX_CAR_NAME_LENGTH + 1),
      'toolong',
      'abcdef',
    ];
    invalidNames.forEach((name) => {
      expect(() => validateCarNameMaxLength(name)).toThrow(ERROR_MESSAGES.CAR_NAME_TOO_LONG);
    });
  });
});

describe('validateNoDuplicates', () => {
  test('중복이 없으면 통과한다', () => {
    const carArray = ['pobi', 'woni', 'jun'];
    expect(() => validateNoDuplicates(carArray)).not.toThrow();
  });

  test('중복된 이름이 있으면 에러를 던진다', () => {
    const carArray = ['pobi', 'woni', 'pobi'];
    expect(() => validateNoDuplicates(carArray)).toThrow(ERROR_MESSAGES.CAR_NAME_DUPLICATED);
  });

  test('모든 이름이 같으면 에러를 던진다', () => {
    const carArray = ['pobi', 'pobi', 'pobi'];
    expect(() => validateNoDuplicates(carArray)).toThrow(ERROR_MESSAGES.CAR_NAME_DUPLICATED);
  });

  test('한 개의 자동차만 있으면 통과한다', () => {
    const carArray = ['pobi'];
    expect(() => validateNoDuplicates(carArray)).not.toThrow();
  });
});

describe('validateCarCountRange', () => {
  test(`${MIN_CAR_COUNT}대 이상 ${MAX_CAR_COUNT}대 이하를 허용한다`, () => {
    const validArrays = [
      ['a'],
      ['a', 'b', 'c'],
      Array.from({ length: MAX_CAR_COUNT }, (_, i) => String.fromCharCode(97 + (i % 26)))
    ];
    validArrays.forEach((arr) => {
      expect(() => validateCarCount(arr)).not.toThrow();
    });
  });

  test(`${MAX_CAR_COUNT}대를 초과하면 에러를 던진다`, () => {
    const carArray = Array.from({ length: MAX_CAR_COUNT + 1 }, (_, i) => `car${i}`);
    expect(() => validateCarCount(carArray)).toThrow(ERROR_MESSAGES.CAR_COUNT_OUT_OF_RANGE);
  });
});

describe('validateCars', () => {
  describe('validateCarsNotEmpty 검증', () => {
    test('빈 문자열이면 에러를 던진다', () => {
      expect(() => validateCars("")).toThrow(ERROR_MESSAGES.CARS_EMPTY);
    });

    test('공백만 있으면 에러를 던진다', () => {
      expect(() => validateCars("   ")).toThrow(ERROR_MESSAGES.CARS_EMPTY);
    });
  });

  describe('validateCarNameLength 검증', () => {
    test('자동차 이름이 공백이면 에러를 던진다', () => {
      expect(() => validateCars(" , pobi")).toThrow(ERROR_MESSAGES.CAR_NAME_TOO_SHORT);
    });

    test('쉼표만 있으면 에러를 던진다', () => {
      expect(() => validateCars("pobi,,jun")).toThrow(ERROR_MESSAGES.CAR_NAME_TOO_SHORT);
    });

    test(`자동차 이름이 ${MAX_CAR_NAME_LENGTH}글자를 넘으면 에러를 던진다`, () => {
      const overLengthName = 'a'.repeat(MAX_CAR_NAME_LENGTH + 1);
      expect(() => validateCars(overLengthName)).toThrow(ERROR_MESSAGES.CAR_NAME_TOO_LONG);
    });

    test(`쉼표로 구분된 여러 자동차 중 하나가 ${MAX_CAR_NAME_LENGTH}글자를 넘으면 에러를 던진다`, () => {
      const overLengthName = 'a'.repeat(MAX_CAR_NAME_LENGTH + 1);
      expect(() => validateCars(`pobi,${overLengthName},jun`)).toThrow(ERROR_MESSAGES.CAR_NAME_TOO_LONG);
    });
  });

  describe('validateNoDuplicates 검증', () => {
    test('중복된 자동차 이름이 있으면 에러를 던진다', () => {
      expect(() => validateCars('pobi,woni,pobi')).toThrow(ERROR_MESSAGES.CAR_NAME_DUPLICATED);
    });

    test('공백을 제거한 후 중복을 검사한다', () => {
      expect(() => validateCars('pobi, woni, pobi')).toThrow(ERROR_MESSAGES.CAR_NAME_DUPLICATED);
    });
  });

  describe('validateCarCount 검증', () => {
    test(`자동차 개수가 ${MAX_CAR_COUNT}대를 초과하면 에러를 던진다`, () => {
      const overCountCars = Array.from({ length: MAX_CAR_COUNT + 1 }, (_, i) => `c${i}`).join(",");
      expect(() => validateCars(overCountCars)).toThrow(ERROR_MESSAGES.CAR_COUNT_OUT_OF_RANGE);
    });
  });

  describe('정상 입력', () => {
    test('유효한 자동차 이름들을 입력하면 배열을 반환한다', () => {
      const result = validateCars('pobi,woni,jun');
      expect(result).toEqual(['pobi', 'woni', 'jun']);
    });

    test('공백을 제거한 상태로 반환한다', () => {
      const result = validateCars('  pobi , woni , jun  ');
      expect(result).toEqual(['pobi', 'woni', 'jun']);
    });

    test('한 글자 자동차 이름도 통과한다', () => {
      const result = validateCars('a,b,c');
      expect(result).toEqual(['a', 'b', 'c']);
    });

    test(`${MAX_CAR_NAME_LENGTH}글자 이름도 통과한다`, () => {
      const maxLengthName = 'a'.repeat(MAX_CAR_NAME_LENGTH);
      const result = validateCars(maxLengthName);
      expect(result).toEqual([maxLengthName]);
    });

    test('한 대의 자동차만 입력해도 배열로 반환한다', () => {
      const result = validateCars('pobi');
      expect(result).toEqual(['pobi']);
    });
  });
});