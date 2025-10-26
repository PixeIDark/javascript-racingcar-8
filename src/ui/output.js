import {MissionUtils} from "@woowacourse/mission-utils";
import {OUTPUT_MESSAGES} from "../constants/outputMessages.js";

const printEmptyLine = () => {
  MissionUtils.Console.print("");
};

export const printRaceRound = (formattedRound) => {
  for (const [car, distanceBar] of formattedRound) {
    MissionUtils.Console.print(`${car} : ${distanceBar}`);
  }

  printEmptyLine();
};

export const printRaceResult = (winnersString, dashRaceHistory) => {
  MissionUtils.Console.print(OUTPUT_MESSAGES.RACE_RESULT);

  dashRaceHistory.forEach(printRaceRound);

  MissionUtils.Console.print(OUTPUT_MESSAGES.WINNER(winnersString));
};
