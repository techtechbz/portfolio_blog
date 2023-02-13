import { getStaticProps } from '@/pages/index'
import { postsCardDataForTest } from '@/types/postData'
import { SITE_DECSRIPTION, SITE_NAME } from '@/constants/siteOverviews'
import "@/matchers/posts/toBeFetchedCardData"
import { featuredPostsCardData, recentPostsCardData } from '@/types/cardData'


type staticPageProps = {
  title?: string
  description?: string
  featuredPostsCardData?: featuredPostsCardData
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
    expect(staticProps.title).toBe(SITE_NAME)
  })

  it('Page description test', async () => {
    expect(staticProps.description).toBe(SITE_DECSRIPTION)
  })

  it('Fetching featuredPostsData test', async () => {
    expect(staticProps.featuredPostsCardData).toBeFetchedFeaturedPostsCardData()
  })

  it('Fetching recentPostsData test', async () => {
    expect(staticProps.recentPostsCardData).toBeFetchedRecentPostsCardData()
  })
})