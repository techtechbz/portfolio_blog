export const formatDateString = (dateString: string, locales: string, options: Intl.DateTimeFormatOptions): string => {
  const date = new Date(dateString.replace(/-/g, "/"))
  return new Intl.DateTimeFormat(locales, options).format(date).toString()
}