#!/user/bin/env node

import { getArgs } from "./helpers/args.js"
import {
  printHelp,
  printSuccess,
  printError,
  printForecast,
} from "./services/log.service.js"
import { saveKeyValue, KEY_DICTIONARY } from "./services/storage.service.js"
import { getWeather } from "./services/api.service.js"

const saveToken = async (token) => {
  if (!token.length) {
    printError("Не передан токен")
    return
  }
  try {
    await saveKeyValue(KEY_DICTIONARY.token, token)
    printSuccess("Токен успешно сохранен")
  } catch (error) {
    printError(error.message ?? error)
  }
}

const saveCity = async (city) => {
  if (!city.length) {
    printError("Не передан город")
  }
  try {
    await saveKeyValue(KEY_DICTIONARY.city, city)
  } catch (error) {
    printError(error.message ?? error)
  }
}

const getForecast = async () => {
  try {
    const forecast = await getWeather("Moscow")
    printForecast(forecast)
  } catch (error) {
    if (error?.response?.status === 404) {
      printError("Не верно указан город")
    } else if (error?.response?.status === 401) {
      printError("Использован не верный токен")
    } else {
      printError(error.message)
    }
  }
}

const initCli = () => {
  const args = getArgs(process.argv)

  if (args.h) {
    return printHelp()
  }
  if (args.s) {
    return saveCity(args.s)
  }
  if (args.t) {
    return saveToken(args.t)
  }
  getForecast()
}

initCli()
