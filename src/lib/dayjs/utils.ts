import dayjs from 'dayjs'

export const getCurrentYear = (isBuddhistEra: boolean): string => {
  const yearFormat = isBuddhistEra ? 'BBBB' : 'YYYY'
  return dayjs().format(yearFormat)
}
