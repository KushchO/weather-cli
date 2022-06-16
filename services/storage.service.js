import { homedir } from 'os'
import { join } from 'path'
import { promises } from 'fs'

export const KEY_DICTIONARY = {
    token: 'token',
    city: 'city'
}

const filePath = join(homedir(), 'weather-data.json')

export const saveKeyValue = async (key, value) => {
    const data = await readData()
    data[key] = value
    await promises.writeFile(filePath, JSON.stringify(data))
}

export const getKeyValue = async (key) => {
    const data = await readData()
    return data[key]
}

const readData = async () => {
    let data  = {}
    if(await isExist(filePath)) {
        const file = await promises.readFile(filePath)
        data = JSON.parse(file)
    }
    return data
}

 export const isExist = async (path) => {
     try {
         await promises.stat(path)
         return true
     } catch (error) {
         return false
     }
 }