const hoursStart = []
const hoursEnd = []
const minutesStart = []
const minutesEnd = []
const days = [
  'Понедельник',
  'Вторник',
  'Среда',
  'Четверг',
  'Пятница',
  'Суббота',
  'Воскресение',
]
for (let i = 8; i < 21; i++) {
  hoursStart.push(i)
  hoursEnd.push(i)
}
for (let i = 0; i < 60; i += 5) {
  minutesStart.push(i)
  minutesEnd.push(i)
}

export const Settings = {
  hoursStart,
  hoursEnd,
  minutesStart,
  minutesEnd,
  days,
}
export const initState = days.map((d) => ({
  [d]: {
    enabled: true,
    hoursStart: hoursStart[0],
    hoursEnd: hoursEnd[0],
    minutesStart: minutesStart[0],
    minutesEnd: minutesEnd[0],
  },
}))
