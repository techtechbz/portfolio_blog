export const convertToDate = (dateString: string) => {
  return new Date(dateString.replace(/-/g, "/"))
}

export const formatDateString = (dateString: string, locales: string, options: Intl.DateTimeFormatOptions): string => {
  const date = convertToDate(dateString)
  return new Intl.DateTimeFormat(locales, options).format(date).toString()
}