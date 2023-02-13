import { getStaticProps } from '@/pages/posts/index'
import "@/matchers/posts/toBeFetchedCardData"

import { postMatterResultOverviews } from '@/types/matterResultData'
import { featuredPostsCardData, recentPostsCardData } from '@/types/cardData'


type staticPageProps = {
  title?: string
  description?: string
  mainFeaturedPostCardData?: postMatterResultOverviews
  subFeaturedPostsCardData?: featuredPostsCardData
  recentPostsCardData?: recentPostsCardData
}

describe('Home page test', () => {
  let staticProps: staticPageProps

  it('Fetching static props test', async () => {
    const staticPageData = await getStaticProps()
    staticProps = staticPageData.props
    expect(staticProps).not.toBeUndefined()
  })

  it('Page title test', () => {
    expect(typeof staticProps.title).toBe('string')
  })

  it('Page description test', async () => {
    expect(typeof staticProps.description).toBe('string')
  })

  it('Fetching mainFeaturedPostCardData test', async () => {
    expect([staticProps.mainFeaturedPostCardData]).toBeFetchedFeaturedPostsCardData()
  })    

  it('Fetching subFeaturedPostCardData test', async () => {
    expect(staticProps.subFeaturedPostsCardData).toBeFetchedFeaturedPostsCardData()
  })

  it('Fetching recentPostsCardData test', async () => {
    expect(staticProps.recentPostsCardData).toBeFetchedRecentPostsCardData()
  })
})