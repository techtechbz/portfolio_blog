import { getStaticProps } from '@/pages/posts/index'
import { mainFeaturedPostDataForTest, postsCardDataForTest } from '@/types/postData'
import "@/matchers/posts/toBeFetchedCardData"


type staticPageProps = {
  title?: string
  description?: string
  mainFeaturedPostData?: mainFeaturedPostDataForTest
  subFeaturedPostsData?: postsCardDataForTest
  recentPostsData?: postsCardDataForTest
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

  it('Fetching mainFeaturedPostData test', async () => {
    expect([staticProps.mainFeaturedPostData]).toBeFetchedFeaturedPostsData()
  })    

  it('Fetching subFeaturedPostsData test', async () => {
    expect(staticProps.subFeaturedPostsData).toBeFetchedFeaturedPostsData()
  })

  it('Fetching recentPostsData test', async () => {
    expect(staticProps.recentPostsData).toBeFetchedRecentPostsData()
  })
})