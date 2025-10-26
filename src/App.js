import {readCarNames, readRounds} from "./ui/input.js";
import {validateCars} from "./validator/carsValidator.js";
import {validateRounds} from "./validator/roundsValidator.js";
import {initializeRaceState} from "./domain/car.js";
import {playAllRounds} from "./domain/race.js";
import {getWinners} from "./domain/result.js";
import {formatRaceHistory} from "./formatter/raceFormatter.js";
import {printRaceResult} from "./ui/output.js";

class App {
  async run() {
    const carsInput = await readCarNames();
    const cars = validateCars(carsInput);

    const roundsInput = await readRounds();
    const rounds = validateRounds(roundsInput);

    const initialRaceState = initializeRaceState(cars);
    const distanceRaceHistory = playAllRounds(initialRaceState, rounds);

    const finalRoundState = distanceRaceHistory.at(-1);
    const winnersString = getWinners(finalRoundState).join(", ");
    const dashRaceHistory = formatRaceHistory(distanceRaceHistory);

    printRaceResult(winnersString, dashRaceHistory);
  }
}

export default App;
