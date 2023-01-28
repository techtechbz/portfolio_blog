import { getStaticProps, getStaticPaths } from '@/pages/posts/[category]'
import { searchResult } from '@/types/searchResult'
import "@/matchers/posts/toBeFetchedCardData"


type staticPagePaths = {
  paths?: ReadonlyArray<{params: { category: string }}>
  fallback?: boolean
}

type staticPageProps = {
  title?: string
  description?: string
  searchResultData?: searchResult
}

describe('Home page test', () => {
  let staticPaths: staticPagePaths
  let staticProps: staticPageProps

  it('Fetching static paths test', async () => {
    staticPaths = await getStaticPaths()
    expect(Array.isArray(staticPaths.paths)).toBe(true)
  })

  it('Static paths test', () => {
    for (const path of staticPaths.paths) {
      expect(/[a-z]+/.exec(path.params.category) !== null).toBe(true)
    }
  })

  it('Page fallback test', () => {
    expect(staticPaths.fallback).toBe(false)
  })

  it('Fetching static props test', async () => {
    const dummyContext = {params: {category: 'math'}, locales: undefined, locale: undefined, defaultLocale: undefined}
    const staticPageData = await getStaticProps(dummyContext)
    staticProps = staticPageData.props
    expect(staticProps).not.toBeUndefined()
  })

  it('Page title test', () => {
    expect(typeof staticProps.title).toBe('string')
  })

  it('Page description test', async () => {
    expect(typeof staticProps.description).toBe('string')
  })

  it('Fetching searchResultData test', async () => {
    expect(staticProps.searchResultData.foundPostsData).toBeFetchedRecentPostsData()
  })
})