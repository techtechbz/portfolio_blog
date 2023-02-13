import { formatDateString } from "@/lib/posts/dataHandler/formatDateString"


describe('Format date string test', () => {
  it.each([
    {dateString: "2022-1-1", locales: 'ja-JP', options: { year: "numeric", month: "short" },
    expected: "2022年1月"},
    {dateString: "2022-1-1", locales: 'ja-JP', options: { year: "numeric", month: "short", day: "numeric" },
    expected: "2022年1月1日"},
    {dateString: "2022-1-1", locales: 'en-US', options: { year: "numeric", month: "long", day: "numeric" },
    expected: "January 1, 2022"},
  ])('Md file class test path ($dateString)', ({dateString, locales, options, expected}) => {    
    expect(formatDateString(dateString, locales, options)).toBe(expected)
  })
})