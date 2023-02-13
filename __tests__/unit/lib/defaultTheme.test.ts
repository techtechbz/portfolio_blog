import { defaultTheme } from "@/lib/themes/defaultTheme"


describe('Default theme test', () => {
  it('Break points test', () => {
    expect(defaultTheme.breakpoints.values.sm).toBe(768)
  })
})