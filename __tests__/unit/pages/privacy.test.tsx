import { getStaticProps } from '@/pages/privacy'
import "@/matchers/posts/toBeFetchedFixedPageData"


type staticPageProps = {
  title?: string
  description?: string
  privacyPolicyPageData?: {
    contentHtml?: string
    createDate?: string
  }
}

describe('Privacy Policy page test', () => {
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

  it('Fetching page contents data test', async () => {
    expect(staticProps.privacyPolicyPageData).toBeFetchedFixedPageData()
  })
})