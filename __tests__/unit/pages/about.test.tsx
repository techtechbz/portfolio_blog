import { render, screen, waitFor } from '@testing-library/react'

import SiteIntroduction, { getStaticProps } from '@/pages/about'
import "@/matchers/toBeFetchedPostsData"


describe('Site Introduction page test', () => {
  let staticProps

  it('Fetching static props test', async () => {
    const staticPageData = await getStaticProps()
    staticProps = staticPageData.props
    expect(staticProps).not.toBeUndefined()
  })

  it('Page title test', () => {
    expect(typeof staticProps.title).toBe('string')
  })

  it('Page description test', async () => {
    expect(typeof staticProps.description).toBe("string")
  })

  it('Page description test', async () => {
    expect([staticProps.siteIntroductionPageData]).toBeFetchedRecentPostsData()
  })

  it.each([{isMobile: true}, {isMobile: false}]
    )('sideMenu rendering test', async ({isMobile}) => {
    const sideMenuTitle = '運営者紹介'
    render(<SiteIntroduction {...{...staticProps, isMobile}} />);
    
    await waitFor(() => screen.queryByText(sideMenuTitle))

    expect(screen.queryByText(sideMenuTitle)).toBeNull()
  })
})