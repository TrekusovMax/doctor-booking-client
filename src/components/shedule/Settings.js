const hoursStart = []
const hoursEnd = []
const minutesStart = []
const minutesEnd = []
const days = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресение']
for (let i = 0; i < 60; i++) {
  if (i < 24) {
    hoursStart.push(i)
    hoursEnd.push(i)
  }
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
