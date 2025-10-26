import { MissionUtils } from "@woowacourse/mission-utils";
import {PROMPT_MESSAGES} from "../constants/promptMessages.js";

export const readCarNames = async () => {
  return await MissionUtils.Console.readLineAsync(PROMPT_MESSAGES.CAR_NAMES);
};

export const readRounds = async () => {
  return await MissionUtils.Console.readLineAsync(PROMPT_MESSAGES.ROUNDS);
};