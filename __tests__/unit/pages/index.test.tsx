import { render, screen, waitFor } from '@testing-library/react'

import HomePage, { getStaticProps } from '@/pages/index'
import { SITE_DECSRIPTION, SITE_NAME } from '@/constants/siteOverviews'
import "@/matchers/toBeFetchedPostsData"


describe('Home page test', () => {
  let staticProps

  it('Fetching static props test', async () => {
    const staticPageData = await getStaticProps()
    staticProps = staticPageData.props
    expect(staticProps).not.toBeUndefined()
  })

  it('Page title test', () => {
    expect(staticProps.title).toBe(SITE_NAME)
  })

  it('Page description test', async () => {
    expect(staticProps.description).toBe(SITE_DECSRIPTION)
  })

  it('Page description test', async () => {
    expect(staticProps.featuredPostsData).toBeFetchedFeaturedPostsData()
  })

  it('Page description test', async () => {
    expect(staticProps.recentPostsData).toBeFetchedRecentPostsData()
  })

  it.each([{isMobile: true}, {isMobile: false}]
    )('sideMenu rendering test', async ({isMobile}) => {
    const sideMenuTitle = '運営者紹介'
    render(<HomePage {...{...staticProps, isMobile}} />);
    
    await waitFor(() => screen.queryByText(sideMenuTitle))

    expect(screen.queryByText(sideMenuTitle)).toBeNull()
  })
})