import https from "https"
import { getKeyValue, KEY_DICTIONARY } from "./storage.service.js"
import axios from 'axios'

export const getWeather = async (city) => {
  const apiToken = process.env.TOKEN ?? await getKeyValue(KEY_DICTIONARY.token)
  const cityName = process.env.CITY ?? city
  if(!apiToken) {
    throw new Error('Не задан ключ API, задайте его через команду -t [API_KEY]')
  }

  const { data, } = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
    params: {
      q: cityName,
      appid: apiToken,
      lang: 'ru',
      units: 'metric'
    }
  })

  return data

}
