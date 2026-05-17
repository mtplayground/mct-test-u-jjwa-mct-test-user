const formatUnit = (value: number, singular: string, plural: string) => {
  return `${value} ${value === 1 ? singular : plural}`
}

export const formatDuration = (ms: number) => {
  const normalizedMs = Math.max(0, ms)
  const totalSeconds = Math.floor(normalizedMs / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60

  return `${formatUnit(minutes, 'minute', 'minutes')} ${formatUnit(
    seconds,
    'second',
    'seconds'
  )}`
}
