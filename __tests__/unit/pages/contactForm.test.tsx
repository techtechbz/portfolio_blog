import { getStaticProps } from '@/pages/contact'
import "@/matchers/posts/toBeFetchedFixedPageData"


type staticPageProps = {
  title?: string
  description?: string
}

describe('contact form page test', () => {
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
})