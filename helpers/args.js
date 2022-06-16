export const getArgs = (args) => {
  const result = {}
  args.slice(2).forEach((item, index, array) => {
    if (item.charAt(0) === "-") {
      if (array[index + 1] && array[index + 1].charAt(0) !== "-") {
        result[item.slice(1)] = array[index + 1]
      } else {
        result[item.slice(1)] = true
      }
    }
  })
  return result
}
