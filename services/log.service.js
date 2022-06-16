import chalk from "chalk"
import dedent from "dedent-js";

export const printError = (error) => {
  console.log(chalk.bgRed.bold(" ERROR ") + " " + error)
}

export const printSuccess = (message) => {
  console.log(chalk.bgGreen.bold(" SUCCESS ") + " " + message)
}

export const printHelp = () => {
  console.log(
    dedent`${chalk.bgCyan.black.bold(" HELP ")}
    Без парметров - вывод погоды
    -s [CITY] установка города
    -h вывод помощи
    -t [API_KEY] сохранение токена
    `
  )
}

export const printForecast = (forecast) => {
  const {name, main:{temp_min, temp_max, pressure}, clouds: {all}} = forecast
  const tempMin = temp_min.toFixed()
  const tempMax = temp_max.toFixed()
  const signfirst =tempMin > 0 ? '+' : tempMin == 0 ? '' : '+'
  const signsecond = tempMax > 0 ? '+' : tempMax == 0 ? '' : '+'
  console.log(
    dedent`${chalk.bgCyan.black.bold(` Прогноз погоды в городе ${name} `)}
    Температура воздуха ${signfirst}${tempMin} ${signsecond}${tempMax}
    Давление ${pressure}мм ртутного столба
    Облачность ${all}%
    `
  )
}
