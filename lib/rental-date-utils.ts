import {
  addBusinessDays,
  addDays,
  endOfDay,
  isWeekend,
  startOfDay,
} from 'date-fns'

type AutoDateRangeInput = {
  requestDate: Date
  days: number
  includeWeekends: boolean
}

const normalizeStartDate = (requestDate: Date, includeWeekends: boolean) => {
  const baseDate = startOfDay(requestDate)

  if (includeWeekends) {
    return baseDate
  }

  let current = baseDate
  while (isWeekend(current)) {
    current = addDays(current, 1)
  }

  return current
}

export const getAutoRentalDateRange = ({
  requestDate,
  days,
  includeWeekends,
}: AutoDateRangeInput) => {
  const safeDays = Math.max(1, Number(days) || 1)
  const startDate = normalizeStartDate(requestDate, includeWeekends)

  const endDate = includeWeekends
    ? endOfDay(addDays(startDate, safeDays - 1))
    : endOfDay(addBusinessDays(startDate, safeDays - 1))

  return { startDate, endDate }
}
