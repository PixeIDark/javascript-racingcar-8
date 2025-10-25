import { MissionUtils } from "@woowacourse/mission-utils";

class App {
  async run() {
    // 입력 - cars: String => Array, chance: String => Number
    // 1. 입력 유효성 검증
    // Console.readLineAsync()는 항상 Promise<string>을 반환
    let cars = await MissionUtils.Console.readLineAsync("경주할 자동차 이름(이름은 쉼표(,) 기준으로 구분) \n")
    cars = cars.trim()

    if(cars.length === 0) throw new Error("[ERROR] cars 없음");

    // 자동차 이름은 쉼표(,)를 기준으로 구분하며 이름은 5자 이하만 가능하다.
    for(const car of cars.split(",")) {
      const carName = car.trim()

      if(carName.length > 5) throw new Error("[ERROR] 자동차 이름 5글자 넘음")

      if(carName.length === 0) throw new Error("[ERROR] 자동차 이름 공백임")
    }

    let chance = await MissionUtils.Console.readLineAsync("시도할 횟수 \n")
    chance = chance.trim()

    if(chance.length === 0) throw new Error("[ERROR] chance 없음");

    chance = Number(chance)

    if(isNaN(chance)) throw new Error("[ERROR] chance 유효한 숫자 아님");

    // 사용자가 소수점을 넣은거 floor 로 허용해줄수도있음
    if(!Number.isInteger(chance)) throw new Error("[ERROR] chance 정수 아님")

    // 음수 * -1 로 허용 해줄수도 있음
    if(chance <= 0) throw new Error("[ERROR] chance 0이하임")

    // 2. 처음에 cars 를 받으면 split(",") 으로 배열화
    cars = cars.split(",")

    // 3. new Map(), carName => distance 형식으로 정리 (라운드 마다 키와 밸류를 출력. 이 때, 출력 양식 템플릿 함수 있으면 좋을듯)
    const map = new Map()

    for(const car of cars){
      const carTrim = car.trim()

      if(!map.has(carTrim)) map.set(carTrim, 0)
    }

    // 4. Map 을 순회. 무작위 값 호출 후 4 이상이면 count++
    while(chance > 0) {

      for(const [car, count] of map) {
        const value = MissionUtils.Random.pickNumberInRange(0, 9)

        if(value >= 4) map.set(car, count + 1)

        const distance = "-".repeat(map.get(car))

        MissionUtils.Console.print(`${car} : ${distance}`)
      }

      chance--
    }

    // 5. chance 를 모두 소모 하면 종료. Map 을 value 내림차로 정렬 후 [0][1]과 값이 같으면 우승자 목록에 [i][0] 추가함, 아닐시 break
    const sortedArr = [...map].toSorted((a, b) => b[1] - a[1])
    const maxCount = sortedArr[0][1]
    const winner = []

    for(const [car, count] of sortedArr) {
      if(count === maxCount) winner.push(car)
      else break
    }

    const result = winner.join(", ")

    MissionUtils.Console.print(`최종 우승자 : ${result}`)
  }
}

export default App;
